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
import PointsService from "./points_service.js";

export default class EventService {
  async isRegistered(user: User, event: Event) {
    // if (event.price.toCents() > 0) return this.isRegisteredInPaidEvent(user, event);
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
    // if (event.price.toCents() > 0) this.paidRegistration(user, event, data);
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

  // private async paidRegistration(user: User, event: Event, data: MBWayOrder | null) {
  //   const { products, name, nif, address, mobileNumber } = data!;

  //   if (!mobileNumber) return;

  //   // 1. See if user already enrolled
  //   if (await this.isRegistered(user, event)) return;

  //   // 2. Issue order creation and job spawning to pay
  //   for (const product of products) {
  //     const order = await OrderService.createOrder(user, product);
  //     const productModel = await Product.findOrFail(product.productId);

  //     await PaymentService.create(
  //       order,
  //       productModel.price,
  //       mobileNumber,
  //       "",
  //       user.email,
  //       nif,
  //       address,
  //       name,
  //     );
  //   }
  // }

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

  async checkin(user: User, event: Event) {
    await event.related("checkedInUsers").attach({
      [user.id]: { checked_in_at: DateTime.now().toISO() },
    });

    await event.save();
    const product = await Product.find(event.participationProductId);

    const listener = new EventCheckinListener();
    await listener.handle(new EventCheckin(product, user));
  }
}
