import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "participant_profiles";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("slug").unique();
      table.string("about");
      table.string("github");
      table.string("linkedin");
      table.string("website");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("slug");
      table.dropColumn("about");
      table.dropColumn("github");
      table.dropColumn("linkedin");
      table.dropColumn("website");
    });
  }
}
