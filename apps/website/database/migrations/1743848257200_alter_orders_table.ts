import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "orders";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("name");
      table.dropColumn("nif");
      table.dropColumn("address");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("name").notNullable();
      table.string("nif").notNullable();
      table.string("address").nullable();
    });
  }
}
