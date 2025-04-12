import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "events";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("company_id").unsigned().unique().references("id").inTable("companies");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("company_id");
    });
  }
}
