import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  override async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('request_id')
    })
  }

  override async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('request_id')
    })
  }
}