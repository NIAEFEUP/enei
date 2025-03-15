import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  override async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('participant_profile_id')
        .unique()
        .references('id')
        .inTable('participant_profiles')
    })
  }

  override async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('participant_profile_id')
    })
  }
}