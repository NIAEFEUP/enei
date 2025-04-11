import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "product_groups";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("max_amount_per_group").nullable().alter();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("max_amount_per_group").notNullable().alter();
    });
  }
}
