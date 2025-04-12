import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "event_companies";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("event_id").unsigned().references("events.id");
      table.integer("company_id").unsigned().references("companies.id");

      table.timestamp("created_at");
      table.timestamp("updated_at");

      table.unique(["event_id", "company_id"]);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
