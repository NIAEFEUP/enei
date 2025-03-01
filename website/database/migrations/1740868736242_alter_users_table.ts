import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('speaker_profile_id')
        .unique()
        .references('id')
        .inTable('speaker_profiles')
      table.integer('company_profile_id')
        .unique()
        .references('id')
        .inTable('company_profiles')
      table.integer('representative_profile_id')
        .unique()
        .references('id')
        .inTable('representative_profiles')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('speaker_profile_id')
      table.dropColumn('company_profile_id')
      table.dropColumn('representative_profile_id')
    })
  }
}