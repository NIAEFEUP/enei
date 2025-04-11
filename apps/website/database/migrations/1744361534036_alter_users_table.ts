import User from '#models/user';
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, async (table) => {
      const users = await User.all();

      for (const user of users) {
        await user.load("participantProfile")
        await user.load("representativeProfile")

        console.log("participant profile: ", user.participantProfile)

        if (user.participantProfile) {
          user.slug = user.participantProfile.slug;
          await user.save();
        } 
      }
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, async (table) => {
      await User.query().update({ slug: null });
    })
  }
}