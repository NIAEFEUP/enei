import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "departments";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("order_priority").notNullable().defaultTo(0);
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("order_priority");
    });
  }
}
