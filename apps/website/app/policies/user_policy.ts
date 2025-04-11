import Company from "#models/company";
import EventCompany from "#models/event_company";
import User from "#models/user";
import { BasePolicy } from "@adonisjs/bouncer";

export default class UserPolicy extends BasePolicy {
  async canUserHandleStoreProductCollection(user: User) {
    return user.role === "staff";
  }

  /**
   * Only promoters or users with purchased tickets can refer other users
   */
  async refer(user: User) {
    if (user.isPromoter()) return true;

    return await User.hasPurchasedTicket(user);
  }

  /**
   * Only users who are not promoters, have not been referred, and have not purchased tickets can be linked as referrals
   */
  async beLinked(user: User) {
    return !user.isPromoter() && !user.wasReferred() && !(await User.hasPurchasedTicket(user));
  }

  async seeCV(user: User, cvOwner: User) {
    if (user.isCompanyRepresentative()) {
      await user.load("representativeProfile");
      await user.representativeProfile.load("company");

      if (user.representativeProfile.company.cvPermissions === "all") {
        return true;
      } else if (user.representativeProfile.company.cvPermissions === "visited") {
        // Check if the user has checkedin in an event the company is associated with.
        const exists = await EventCompany.query()
          .innerJoin("event_checkins", "event_companies.event_id", "event_checkins.event_id")
          .where("event_checkins.user_id", cvOwner.id)
          .andWhere("event_companies.company_id", user.representativeProfile.company.id)
          .first();

        return !!exists;
      } else {
        return false;
      }
    }

    return user.isStaff() || user.id === cvOwner.id;
  }
}
