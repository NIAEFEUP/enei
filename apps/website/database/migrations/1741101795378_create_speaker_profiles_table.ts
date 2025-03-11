import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "speaker_profiles";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamps({ defaultToNow: true });

      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("job_title");
      table.enum('speaker_role', ['keynote_speaker', 'panelist', 'moderator']).notNullable()
      table.string("profile_picture");

      table.string('orcid_link').nullable();
      table.string('about').nullable()
      table.integer('company_id').references('id').inTable('company')

    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
