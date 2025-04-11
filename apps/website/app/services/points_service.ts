import db from "@adonisjs/lucid/services/db";
import {
  UserActivityType,
  type ReferralDescription,
  type UserActivityDescription,
} from "../../types/user_activity.js";
import User from "#models/user";
import type Event from "#models/event";
import Order from "#models/order";
import Product from "#models/product";
import OrderProduct from "#models/order_product";

/**
 * This service will be responsible for handling how many points a certain event
 * gives to a given user
 */
export default class PointsService {
  private static pointsRegistry: Map<UserActivityType, { [key: string]: number }> = new Map([
    [
      UserActivityType.Referral,
      {
        promoter: 20,
        participant: 10,
      },
    ],
  ]);

  static async eventCheckinPointAttribution(user: User, points: number) {
    await db.transaction(async (trx) => {
      // const order = await Order.create({
      //   userId: user.id,
      //   name: "Event Checkin"
      // }, { client: trx })
      // const product = await Product.create({
      //   name: "Event",
      //   description: "Event Checkin",
      //   currency: "points",
      //   price: -points,
      // }, {
      //   client: trx
      // })

      // await OrderProduct.create({
      //   orderId: order.id,
      //   productId: product.id,
      //   quantity: 1,
      // }, {
      //   client: trx
      // });

      // user.useTransaction(trx).points += points;
      // await user.save();
    })
  }

  async referralPointAttribution(referral: UserActivityDescription) {
    const referralDescription = referral.description as ReferralDescription;

    if (referralDescription.referralIsPromoter) {
      await db.transaction(async (trx) => {
        const user = await User.findOrFail(referralDescription.referralUserId, { client: trx });

        user.points +=
          PointsService.pointsRegistry.get(UserActivityType.Referral)?.["promoter"] ?? 0;
        await user.save();
      });
    } else {
      await db.transaction(async (trx) => {
        const referralUser = await User.findOrFail(referralDescription.referralUserId, {
          client: trx,
        });
        referralUser.points +=
          PointsService.pointsRegistry.get(UserActivityType.Referral)?.["participant"] ?? 0;
        await referralUser.save();

        const promoter = await User.findBy("id", referralDescription.promoterId, { client: trx });
        if (promoter) {
          const promoterUser = promoter.useTransaction(trx);
          promoterUser.points +=
            (PointsService.pointsRegistry.get(UserActivityType.Referral)?.["promoter"] ?? 0)
            - (PointsService.pointsRegistry.get(UserActivityType.Referral)?.["participant"] ?? 0);
          await promoterUser.save();
        }
      });
    }
  }
}
