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

      await Promise.allSettled(
        users.map((user) => {
          user.slug = "slug";
          return user.save();
        }),
      );

      // Hate this
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("slug");
    });
  }
}
