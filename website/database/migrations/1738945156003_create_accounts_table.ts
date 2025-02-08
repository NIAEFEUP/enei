import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.timestamps({ defaultToNow: true })

      table.string('password')

      table.integer('user_id').references('id').inTable('users').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}