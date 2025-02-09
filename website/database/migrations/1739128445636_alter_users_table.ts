import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('promoter_info_id')
        .unique()
        .references('id')
        .inTable('promoter_infos')
      table.integer('participant_info_id')
        .unique()
        .references('id')
        .inTable('participant_infos')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('promoter_info_id')
      table.dropColumn('participant_info_id')
    })
  }
}
