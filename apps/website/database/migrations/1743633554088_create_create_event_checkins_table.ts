import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'event_checkins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer("event_id").references("id").inTable("events");
      table.integer("user_id").references("id").inTable("users");
      table.timestamp("checked_in_at").defaultTo(this.now());

      table.unique(["event_id", "user_id"]);
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}