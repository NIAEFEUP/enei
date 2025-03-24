import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "participant_profiles";

  async up() {
    this.defer(async () => {
      await this.db
        .query()
        .update("purchased_ticket", "early-bird-with-housing")
        .from(this.tableName)
        .whereIn(`${this.tableName}.id`, (db) => {
          return db
            .select("users.participant_profile_id")
            .from("users")
            .join("orders", "users.id", "orders.user_id")
            .where("orders.status", "Success");
        });
    });
  }

  async down() {
    this.defer(async () => {
      await this.db.query().update("purchased_ticket", null).from(this.tableName);
    });
  }
}
