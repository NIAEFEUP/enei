import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "companies";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("sponsor").nullable();
      table.string("about").nullable();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("sponsor");
      table.dropColumn("about");
    });
  }
}
