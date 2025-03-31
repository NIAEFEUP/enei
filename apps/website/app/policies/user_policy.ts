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
}
