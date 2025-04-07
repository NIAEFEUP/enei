import db from "@adonisjs/lucid/services/db";
import {
  UserActivityType,
  type ReferralDescription,
  type RegisteredInEventDescription,
  type UserActivityDescription,
} from "../../types/user_activity.js";
import User from "#models/user";
import type Event from "#models/event";

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

  static userWillExceededNegativePoints(user: User, event: Event) {
    event.loadOnce("product");

    if (!event.product) return user.points < -7500;

    return user.points - event.product.points < -7500;
  }

  async referralPointAttribution(referral: UserActivityDescription) {
    const referralDescription = referral.description as ReferralDescription;

    if (referralDescription.referralIsPromoter) {
      await db.transaction(async (trx) => {
        const user = referralDescription.referralUser.useTransaction(trx);
        user.points +=
          PointsService.pointsRegistry.get(UserActivityType.Referral)?.["promoter"] ?? 0;
        await user.save();
      });
    } else {
      await db.transaction(async (trx) => {
        const referralUser = referralDescription.referralUser.useTransaction(trx);
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
