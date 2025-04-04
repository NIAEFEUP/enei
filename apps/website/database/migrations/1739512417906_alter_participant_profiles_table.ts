import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "participant_profiles";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("purchased_ticket");
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("purchased_ticket");
    });
  }
}
