import UserActivity from '#models/user_activity'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  override async run() {
    await UserActivity.create(
      {
        type: 'referral',
        description: {
          referralCode: "123",
          referralUserId: 1,
          referralIsPromoter: true,
          promoterId: 1,
          referredUserId: 2,
          pointsToPromoter: 20,
        },
      }
    )
  }
}