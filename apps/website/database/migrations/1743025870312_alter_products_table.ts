import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "products";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Creates the index for column price, does not specify which type of index
      table.index(["price"], "product_price_index");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(["price"], "product_price_index");
    });
  }
}
