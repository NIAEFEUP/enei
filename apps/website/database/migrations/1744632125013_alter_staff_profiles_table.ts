import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "staff_profiles";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("first_name");
      table.string("last_name");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("first_name");
      table.dropColumn("last_name");
    });
  }
}
