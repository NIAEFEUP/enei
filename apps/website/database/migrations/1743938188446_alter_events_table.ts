import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "events";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("product_group_id").references("product_groups.id");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropChecks("product_group_id");
    });
  }
}
