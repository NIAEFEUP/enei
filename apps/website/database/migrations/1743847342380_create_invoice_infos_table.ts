import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "invoice_infos";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.timestamp("created_at");
      table.timestamp("updated_at");

      table.string("nif");
      table.string("name");
      table.string("address");

      table.boolean("frozen").defaultTo(false);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
