import User from "#models/user";
import Sqids from "sqids";
import { buildUrl } from "../url.js";
import UserActivity from "#events/user_activity";
import { UserActivityType, type ReferralDescription } from "../../types/user_activity.js";
import app from "@adonisjs/core/services/app";

const sqids = new Sqids({
  minLength: 8,
});

export default class ReferralService {
  // Low-level encoding/decoding

  #encode(id: number) {
    return sqids.encode([id]);
  }

  #decode(hashId: string): number | null {
    const values = sqids.decode(hashId);

    if (values.length !== 1) return null;
    return values[0];
  }

  // To be moved to a policy once bouncer is installed

  async canUserRefer(user: User) {
    if (app.inDev) return true;

    if (user.isPromoter()) return true;

    return await User.hasPurchasedTicket(user);
  }

  async canUserBeLinked(user: User) {
    return !user.isPromoter() && !user.wasReferred() && !(await User.hasPurchasedTicket(user));
  }

  // High-level methods

  async #getReferralCode(user: User) {
    if (!(await this.canUserRefer(user))) {
      return null;
    }

    return this.#encode(user.id);
  }

  async getReferralLink(user: User) {
    const referralCode = await this.#getReferralCode(user);
    if (!referralCode) {
      return null;
    }

    return buildUrl().params({ referralCode: referralCode }).make("actions:referrals.link");
  }

  async getReferrerByCode(referralCode: string): Promise<User | null> {
    const referralUserId = this.#decode(referralCode);
    if (!referralUserId) return null;

    const referrer = await User.find(referralUserId);
    if (!referrer || !(await this.canUserRefer(referrer))) return null;

    return referrer;
  }

  async getReferralCount(user: User): Promise<number | null> {
    if (!(await this.canUserRefer(user))) return null;

    const referrals = await user.related("referrals").query().count("*", "count").first();
    return referrals?.$extras.count;
  }

  async getIndirectReferralCount(user: User): Promise<number | null> {
    if (!user.isPromoter() || !(await this.canUserRefer(user))) return null;

    const indirectReferrals = await user
      .related("indirectReferrals")
      .query()
      .count("*", "count")
      .first();
    return indirectReferrals?.$extras.count;
  }

  async linkUserToReferrer(referredUser: User, referrer: User) {
    if (!(await this.canUserBeLinked(referredUser))) {
      return;
    }

    await referredUser.related("referrer").associate(referrer);

    const referringPromoter = referrer.isPromoter()
      ? referrer
      : referrer.referringPromoterId !== null
        ? await User.getReferringPromoter(referrer)
        : null;

    if (referringPromoter) {
      await referredUser.related("referringPromoter").associate(referringPromoter);
    }
  }

  async handlePointAttribution(referredUser: User, referrer: User) {
    const referralCode = await this.#getReferralCode(referrer);
    if (!referralCode) return;

    // referredUser must be a participant
    if (!referredUser.isParticipant()) return;

    const referralUserId = this.#decode(referralCode);
    if (!referralUserId) return;

    const referralUser = await User.find(referralUserId);
    if (!referralUser) return;

    UserActivity.dispatch(referredUser, {
      description: {
        type: UserActivityType.Referral,
        referralCode,
        referralUser,
        referredUser,
        referralIsPromoter: referralUser.isPromoter(),
        referralReferencedByPromoter: referralUser.referringPromoterId !== null,
        promoterId: referralUser.referringPromoterId,
        pointsToReferralUser: referralUser.points,
        pointsToPromoter:
          referralUser.referringPromoterId !== null
            ? referralUser.referringPromoter?.points
            : undefined,
      } as ReferralDescription,
    });
  }
}
