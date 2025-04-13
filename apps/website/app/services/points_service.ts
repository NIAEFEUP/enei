import db from "@adonisjs/lucid/services/db";
import {
  UserActivityType,
  type ReferralDescription,
  type UserActivityDescription,
} from "../../types/user_activity.js";
import User from "#models/user";
import Event from "#models/event";
import Order from "#models/order";
import Product from "#models/product";
import OrderProduct from "#models/order_product";
import type { TransactionClientContract } from "@adonisjs/lucid/types/database";

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

  static async eventCheckinPointAttribution(user: User, participationProduct: Product | null) {
    if (!participationProduct) return;

    await db.transaction(async (trx) => {
      const order = await Order.create(
        {
          userId: user.id,
          status: "delivered",
          pointsUsed: participationProduct.points,
        },
        { client: trx },
      );

      await OrderProduct.create(
        {
          orderId: order.id,
          productId: participationProduct.id,
          quantity: 1,
        },
        {
          client: trx,
        },
      );

      user.useTransaction(trx).points -= participationProduct.points;
      await user.save();
    });
  }

  static userWillExceededNegativePoints(user: User, event: Event) {
    event.loadOnce("product");

    if (!event.product) return user.points < -7500;

    return user.points - event.product.points < -7500;
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

  async recalculateUserPoints(user: User, trx: TransactionClientContract) {
    await trx.rawQuery(
      `
      update orders
      set points_used = (
        select COALESCE(sum(products.points * order_products.quantity), 0) as total_points from order_products join products on products.id = order_products.product_id and order_products.order_id = orders.id
      )
      where orders.user_id = ?;
      `,
      [user.id],
    );

    await trx.rawQuery(
      `
      update users
      set points = (
        select COALESCE(-1 * sum(orders.points_used), 0) as total_points
        from orders where orders.user_id = users.id
      )
      where users.id = ?;
      `,
      [user.id],
    );
  }

  async recalculateAllUserPoints(trx: TransactionClientContract) {
    await trx.rawQuery(
      `
      update orders
      set points_used = (
        select COALESCE(sum(products.points * order_products.quantity), 0) as total_points from order_products join products on products.id = order_products.product_id and order_products.order_id = orders.id
      );
      `,
    );

    await trx.rawQuery(
      `
      update users
      set points = (
        select COALESCE(-1 * sum(orders.points_used), 0) as total_points
        from orders where orders.user_id = users.id
      );
      `,
    );
  }
}
