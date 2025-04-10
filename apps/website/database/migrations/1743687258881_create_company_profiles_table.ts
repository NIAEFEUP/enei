import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "companies";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamps({ defaultToNow: true });

      table.string("name").notNullable();
      table.string("logo").notNullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
