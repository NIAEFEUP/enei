import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "products";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean("hidden").defaultTo(false);
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("hidden");
    });
  }
}
