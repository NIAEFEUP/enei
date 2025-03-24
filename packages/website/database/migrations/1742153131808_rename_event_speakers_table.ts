import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected oldTableName = "event_speaker";
  protected tableName = "event_speakers";

  async up() {
    this.schema.renameTable(this.oldTableName, this.tableName);
  }

  async down() {
    this.schema.renameTable(this.tableName, this.oldTableName);
  }
}
