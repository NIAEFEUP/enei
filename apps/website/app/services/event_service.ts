import User from "#models/user";
import Event from "#models/event";
import { OrderService } from "./order_service.js";
import type { MBWayOrder } from "../../types/order.js";
import { PaymentService } from "../services/payment_service.js";
import Product from "#models/product";
import OrderProduct from "#models/order_product";
import db from "@adonisjs/lucid/services/db";

export default class EventService {
  async isRegistered(user: User, event: Event) {
    if (event.price.toCents() > 0) return this.isRegisteredInPaidEvent(user, event);
    else return this.isRegisteredInFreeEvent(user, event);
  }

  async isRegisteredInPaidEvent(user: User, event: Event) {
      const orderProducts = await OrderProduct.query()
          .join("orders", "order_products.order_id", "orders.id")
          .join("products", "order_products.product_id", "products.id")
          .where("user_id", user.id)
          .whereIn("orders.status", ["delivery", "pending-delivery"])
          .where("products.product_group_id", event.productGroupId)
          .preload("product")
          .preload("order")
      
      return orderProducts.length > 0
  }

  async isRegisteredInFreeEvent(user: User, event: Event) {
    const isRegistered = await event
      .related("registeredUsers")
      .query()
      .where("user_id", user.id)
      .first();

    return !!isRegistered;
  }

  async register(user: User, event: Event, data: MBWayOrder | null) {
    if (event.price.toCents() > 0) this.paidRegistration(user, event, data);
    else this.freeRegistration(user, event);
  }

  async isCheckedIn(user: User, event: Event) {
    const isChecked = await event
      .related("checkedInUsers")
      .query()
      .where("user_id", user.id)
      .first();

    return !!isChecked;
  }

  private async paidRegistration(user: User, event: Event, data: MBWayOrder | null) {
    const { products, name, nif, address, mobileNumber } = data!;

    if (!mobileNumber) return;

    // 1. See if user already enrolled
    if (await this.isRegistered(user, event)) return;

    // 2. Issue order creation and job spawning to pay
    for (const product of products) {
      const order = await OrderService.createOrder(user, product);
      const productModel = await Product.findOrFail(product.productId);

      await PaymentService.create(
        order,
        productModel.price,
        mobileNumber,
        "",
        user.email,
        nif,
        address,
        name,
      );
    }
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

      user.points -= event.product.points;
      await user.useTransaction(trx).save();
    });
  }

  async checkin(user: User, event: Event) {
    await event.related("checkedInUsers").attach({
      [user.id]: { checked_in_at: new Date() },
    });
    await event.save();
  }
}
