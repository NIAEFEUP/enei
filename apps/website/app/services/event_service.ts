import User from "#models/user";
import Event from "#models/event";
import EventCheckinListener from "#listeners/event_checkin_listeners";
import EventCheckin from "#events/event_checkin";
import { OrderService } from "./order_service.js";
import type { MBWayOrder } from "../../types/order.js";
import OrderProduct from "#models/order_product";
import db from "@adonisjs/lucid/services/db";
import { DateTime } from "luxon";
import Product from "#models/product";
import UserActivity from "#models/user_activity";
import { UserActivityType, type AttendEventDescription } from "../../types/user_activity.js";
import PointsService from "./points_service.js";

export const types_with_time_attendance = ["talk"]

export default class EventService {
  private ATTENDANCE_LIMIT = 80;

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
    if (!types_with_time_attendance.includes(event.type)) {
      await this.registerCheckinInDb(user, event)
    }

    if (types_with_time_attendance.includes(event.type)) {
      this.checkInWithTimeAttendance(user, event, exit)
    } else {
      this.checkInWithPointsGiving(user, event)
    }
  }

  async checkInWithTimeAttendance(user: User, event: Event, exit: boolean | undefined) {
    if(!exit) return

    const activities = await UserActivity
      .query()
      .where("user_id", user.id)
      .whereRaw(`description->>'type' = ?`, ['attend_event'])
      .andWhereRaw(`(description->'event'->>'id')::int = ?`, [event.id])
      .orderBy("created_at", "desc")

    if (exit === (activities[activities.length - 1].description as AttendEventDescription).exit) {
      throw new Error("Este participante já chegou na palestra")
    }

    const checkInTime = DateTime.now()

    const activity = await UserActivity.create({
      userId: user.id,
      type: UserActivityType.AttendEvent,
      description: {
        type: UserActivityType.AttendEvent,
        event: event,
        timestamp: checkInTime.toISO(),
        exit: exit
      }
    })
    activities.push(activity)

    let absence = 0;
    for (let i = 0; i < activities.length - 1; i++) {
      const attendEventDescription = activities[i].description as AttendEventDescription
      const nextAttendEventDescription = activities[i + 1].description as AttendEventDescription

      absence += (DateTime.fromISO(nextAttendEventDescription.timestamp).toSeconds() - DateTime.fromISO(attendEventDescription.timestamp).toSeconds())
    }

    const attendancePercentage = ((absence) / (event.duration * 60)) * 100

    if (attendancePercentage >= this.ATTENDANCE_LIMIT) {
      const checkedUser = await event.related("checkedInUsers").query().where("user_id", user.id).first()
      if (!checkedUser) this.registerCheckinInDb(user, event)

      this.checkInWithPointsGiving(user, event)
    }
  }

  async checkInWithPointsGiving(user: User, event: Event) {
    const product = await Product.find(event.participationProductId);
    const listener = new EventCheckinListener();
    await listener.handle(new EventCheckin(product, user));
  }
}
