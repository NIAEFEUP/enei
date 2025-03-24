import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "event_speaker";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("event_id").unsigned().references("events.id").onDelete("CASCADE");
      table
        .integer("speaker_profile_id")
        .unsigned()
        .references("speaker_profiles.id")
        .onDelete("CASCADE");

      table.timestamp("created_at");
      table.timestamp("updated_at");

      table.unique(["event_id", "speaker_profile_id"]);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
