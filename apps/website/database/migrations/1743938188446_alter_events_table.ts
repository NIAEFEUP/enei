import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "events";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("product_group_id").references("product_groups.id");
      table.integer("product_id").references("products.id");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("product_group_id");
      table.dropColumn("product_id");
    });
  }
}
