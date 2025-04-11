import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "events";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("participation_product_id").references("id").inTable("products");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("participation_product_id");
    });
  }
}
