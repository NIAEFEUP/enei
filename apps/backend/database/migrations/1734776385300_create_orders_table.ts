import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('request_id')
      table.string('status')
      table.integer('user_id').notNullable()
      table.string('name')
      table.integer('nif')
      table.string('address')
      table.float('total')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  override async down() {
    this.schema.dropTable(this.tableName)
  }
}