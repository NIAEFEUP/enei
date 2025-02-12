import UserActivity from '#models/user_activity'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserActivity.create(
      {
        type: 'referral',
        description: {
          referralCode: '123456789',
          promoterCode: '123456789',
          participantCode: '123456789',
          participantName: 'NIAEFEUP',
          promoterName: 'NIAEFEUP',
          promoterEmail: 'ni@aefeup.pt',
          participantEmail: 'ni@aefeup.pt',
        },
      }
    )
  }
}