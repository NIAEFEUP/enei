import User from "#models/user";
import { BasePolicy } from "@adonisjs/bouncer";

export default class UserPolicy extends BasePolicy {
  async canUserHandleStoreProductCollection(user: User) {
    return user.role === "staff";
  }
}
