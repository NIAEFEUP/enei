import UserActivity from "#models/user_activity";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { UserActivityType } from "../../types/user_activity.js";

export default class extends BaseSeeder {
  async run() {
    await UserActivity.create({
      description: {
        type: UserActivityType.Referral,
        referralCode: "123",
        referralUserId: 1,
        referralIsPromoter: true,
        promoterId: 1,
        referredUserId: 2,
        pointsToPromoter: 20,
      },
    });
  }
}
