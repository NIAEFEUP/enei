import User from "#models/user";
import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "participant_profiles";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("slug");
    });

    this.defer(async (client) => {
      const users = await User.all({ client });

      console.debug(users.map((user) => user.id));

      let count = 0;
      for (const user of users) {
        count++;
        if (count % 100 === 0) {
          console.debug(count);
        }
        
        user.slug = "slug";
        await user.save();
      }
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("slug");
    });
  }
}
