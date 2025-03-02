import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "speaker_profiles";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("job_title");
      table.string("profile_picture");
      table.enum('speaker_role', ['keynote_speaker', 'panelist', 'moderator']).notNullable()

      table.string('ORCID_link')
      table.integer('company_id').references('id').inTable('company')

      table.timestamps({ defaultToNow: true })
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
