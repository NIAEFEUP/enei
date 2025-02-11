import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('promoter_info_id').nullable()
    })
  }

  async down() {
    this.schema.alterTable  (this.tableName, (table) => {
      table.dropColumn('promoter_info_id')
    })
  }
}