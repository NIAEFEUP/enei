import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('referring_promoter_id').references('id').inTable('users')

      table.integer('referrer_id').references('id').inTable('users')

      table.integer('promoter_profile_id').unique().references('id').inTable('promoter_profiles')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('promoter_profile_id')

      table.dropColumn('referrer_id')

      table.dropColumn('referring_promoter_id')
    })
  }
}
