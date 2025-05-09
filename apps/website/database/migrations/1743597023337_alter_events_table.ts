import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "events";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text("extra_info");
      table.text("description").alter();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("extra_info");
      // There is no need to restore the description column
      // because it was already changed in a previous migration.
    });
  }
}
