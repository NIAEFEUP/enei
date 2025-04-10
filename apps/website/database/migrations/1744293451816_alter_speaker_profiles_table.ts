import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "speaker_profiles";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("about");
      table.integer("speaker_profile_id").references("id").inTable("speaker_profiles");
      table.string("github");
      table.string("linkedin");
      table.string("website");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("about");
      table.dropColumn("speaker_profile_id");
      table.dropColumn("github");
      table.dropColumn("linkedin");
      table.dropColumn("website");
    });
  }
}
