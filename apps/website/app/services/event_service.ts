import User from "#models/user";
import Event from "#models/event";
import EventCheckinListener from "#listeners/event_checkin_listeners";
import EventCheckin from "#events/event_checkin";
import { OrderService } from "./order_service.js";
import type { MBWayOrder } from "../../types/order.js";
import OrderProduct from "#models/order_product";
import db from "@adonisjs/lucid/services/db";
import { DateTime, Duration } from "luxon";
import Product from "#models/product";
import UserActivity from "#models/user_activity";
import { UserActivityType, type AttendEventDescription } from "../../types/user_activity.js";
import PointsService from "./points_service.js";

export const typesWithTimeAttendance = ["talk"];

export default class EventService {
  private ATTENDANCE_LIMIT = 66.666;

  async isRegistered(user: User, event: Event) {
    return this.isRegisteredInFreeEvent(user, event);
  }

  async isRegisteredInPaidEvent(user: User, event: Event) {
    const orderProducts = await OrderProduct.query()
      .join("orders", "order_products.order_id", "orders.id")
      .join("products", "order_products.product_id", "products.id")
      .where("user_id", user.id)
      .whereIn("orders.status", ["delivery", "pending-delivery"])
      .where("products.product_group_id", event.productGroupId)
      .preload("product")
      .preload("order");

    return orderProducts.length > 0;
  }

  async isRegisteredInFreeEvent(user: User, event: Event) {
    const isRegistered = await event
      .related("registeredUsers")
      .query()
      .where("user_id", user.id)
      .first();

    return !!isRegistered;
  }

  async register(user: User, event: Event, _data: MBWayOrder | null) {
    await this.freeRegistration(user, event);
  }

  async isCheckedIn(user: User, event: Event) {
    const isChecked = await event
      .related("checkedInUsers")
      .query()
      .where("user_id", user.id)
      .first();

    return !!isChecked;
  }

  private async freeRegistration(user: User, event: Event) {
    await event.loadOnce("product"); // deposits will be a product associated with the event

    await db.transaction(async (trx) => {
      if (event.product) {
        await OrderService.createOrder(
          user,
          {
            productId: event.product.id,
            quantity: 1,
          },
          event.product.points,
          "delivered",
          trx,
        );
      }

      await event.related("registeredUsers").attach([user!.id], trx);

      event.ticketsRemaining--;
      await event.useTransaction(trx).save();

      // limwa: Name is a bit wrong here, this function actually just gives the points of a product to a user
      // and creates an order for it
      const product = await Product.find(event.productId);
      await PointsService.eventCheckinPointAttribution(user, product);
    });
  }

  async registerCheckinInDb(user: User, event: Event) {
    await event.related("checkedInUsers").attach({
      [user.id]: { checked_in_at: DateTime.now().toISO() },
    });
  }

  async checkin(user: User, event: Event, exit?: boolean) {
    if (typesWithTimeAttendance.includes(event.type)) {
      this.checkInWithTimeAttendance(user, event, exit);
    } else {
      await this.registerCheckinInDb(user, event);
      this.checkInWithPointsGiving(user, event);
    }
  }

  async checkInWithTimeAttendance(user: User, event: Event, exit: boolean | undefined) {
    if (exit === undefined) return;

    await UserActivity.create({
      userId: user.id,
      type: UserActivityType.AttendEvent,
      description: {
        type: UserActivityType.AttendEvent,
        event: event.id,
        timestamp: DateTime.now().toISO(),
        exit: exit,
      },
    });
  }

  async checkInBasedOnTimeAttendance(user: User) {
    console.debug("Calculating attendance for user", user.id);

    const activities = await UserActivity.query()
      .where("user_id", user.id)
      .andWhere("type", UserActivityType.AttendEvent)
      .orderBy(db.raw("description->>'timestamp'"), "asc");

    console.debug("Found", activities.length, "activities for user", user.id);

    const intervals: [string, string][] = [];
    let nextInterval: [string, string] | string | null = null;
    for (const activity of activities) {
      const description = activity.description as AttendEventDescription;

      if (description.exit) {
        if (nextInterval) {
          const start: string = Array.isArray(nextInterval) ? nextInterval[0] : nextInterval;
          nextInterval = [start, description.timestamp];
        }
      } else {
        if (Array.isArray(nextInterval)) {
          intervals.push(nextInterval);
          nextInterval = null;
        }

        if (nextInterval === null) nextInterval = description.timestamp;
      }
    }
    if (Array.isArray(nextInterval)) intervals.push(nextInterval);

    console.debug("Found", intervals.length, "intervals for user", user.id);

    const attendance: Map<number, Duration> = new Map();
    for (const [start, end] of intervals) {
      const startTime = DateTime.fromISO(start);
      const endTime = DateTime.fromISO(end);

      console.debug("Interval from", startTime.toISO(), "to", endTime.toISO());

      const events = await Event.query()
        .where((q) =>
          q
            .where(db.raw("date + (duration::int * interval '1 minute')").wrap("(", ")"), ">=", start)
            .orWhere(
              db.raw("actual_date + (duration::int * interval '1 minute')").wrap("(", ")"),
              ">=",
              start,
            ),
        )
        .andWhere((q) => q.where("date", "<=", end).orWhere("actual_date", "<=", end))
        .andWhereIn("type", typesWithTimeAttendance);

      console.debug("Found", events.length, "events in interval");

      for (const event of events) {
        const eventStart = event.actualDate ?? event.date;
        const eventEnd = event.date.plus({ minutes: event.duration });

        const overlapStart = DateTime.max(startTime, eventStart);
        const overlapEnd = DateTime.min(endTime, eventEnd);
        const overlapDuration = overlapEnd.diff(overlapStart, "minutes");

        const oldAttendance = attendance.get(event.id);
        const newAttendance = oldAttendance ? oldAttendance.plus(overlapDuration) : overlapDuration;
        attendance.set(event.id, newAttendance);

        console.debug(
          "Event",
          event.id,
          "from",
          eventStart.toISO(),
          "to",
          eventEnd.toISO(),
          "has",
          overlapDuration.toISO(),
          "of overlap from",
          overlapStart.toISO(),
          "to",
          overlapEnd.toISO(),
        );
      }
    }

    for (const [eventId, duration] of attendance) {
      const event = await Event.findOrFail(eventId);

      const percentage = (duration.as("minutes") / event.duration) * 100;

      console.debug("Event", event.id, "has", percentage, "% of attendance");

      if (percentage >= this.ATTENDANCE_LIMIT && !(await this.isCheckedIn(user, event))) {
        console.debug("User", user.id, "has checked in to event", event.id);
        await this.registerCheckinInDb(user, event);
        await this.checkInWithPointsGiving(user, event);
      }
    }
  }

  async checkInWithPointsGiving(user: User, event: Event) {
    const product = await Product.find(event.participationProductId);
    const listener = new EventCheckinListener();
    await listener.handle(new EventCheckin(product, user));
  }
}
