import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "users";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("slug");
      table
        .integer("speaker_profile_id")
        .references("id")
        .inTable("speaker_profiles")
        .defaultTo(null);
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("slug");
      table.dropColumn("speaker_profile_id");
    });
  }
}
