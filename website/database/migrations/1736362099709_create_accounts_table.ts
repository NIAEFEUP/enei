import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.string('id').primary()
      table.string('password')

      table.integer('user_id').references('id').inTable('users').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
