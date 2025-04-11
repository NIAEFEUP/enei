import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "products";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("points").nullable();

      table.integer("price").nullable().alter();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("points");

      table.integer("price").notNullable().alter();
    });
  }
}
