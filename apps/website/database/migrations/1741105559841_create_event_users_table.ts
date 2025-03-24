import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "event_users";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("event_id").unsigned().references("id").inTable("events").onDelete("CASCADE");

      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");

      table.unique(["event_id", "user_id"]);

      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
