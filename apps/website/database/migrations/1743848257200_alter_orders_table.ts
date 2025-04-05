import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "orders";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("name");
      table.dropColumn("nif");
      table.dropColumn("address");
      table.dropColumn("request_id");
      table.dropColumn("total");
      table.integer("points_used").notNullable().defaultTo(0);
    });

    this.schema.alterTable(this.tableName, (table) => {
      table.integer("points_used").notNullable().alter();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("name").notNullable();
      table.string("nif").notNullable();
      table.string("address");
      table.string("request_id");
      table.float("total");
      table.dropColumn("points_used");
    });
  }
}
