import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "payments";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.timestamp("created_at");
      table.timestamp("updated_at");

      table.string("status").notNullable();
      table.string("request_id").notNullable();
      table.string("reason").nullable();
      table.integer("amount").notNullable();

      table.integer("order_id").references("orders.id");
      table.integer("invoice_info_id").references("invoice_infos.id");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
