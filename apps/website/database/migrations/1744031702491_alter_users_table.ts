import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "users";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("representative_profile_id")
        .references("id")
        .inTable("representative_profiles").defaultTo(null);
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("representative_profile_id");
    });
  }
}
