import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "orders";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("request_id");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("request_id");
    });
  }
}
