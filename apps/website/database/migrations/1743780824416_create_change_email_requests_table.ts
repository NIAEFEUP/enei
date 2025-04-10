import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "change_email_requests";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("user_id").notNullable();
      table.string("old_email").notNullable();
      table.string("new_email").notNullable();
      table.boolean("old_email_confirmed").defaultTo(false);
      table.boolean("new_email_confirmed").defaultTo(false);
      table.boolean("canceled").defaultTo(false);
      table.boolean("performed").defaultTo(false);

      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
