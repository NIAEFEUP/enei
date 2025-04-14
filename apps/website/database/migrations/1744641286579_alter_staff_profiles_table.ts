import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "staff_profiles";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean("is_coordinator").defaultTo(false);
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("is_coordinator");
    });
  }
}
