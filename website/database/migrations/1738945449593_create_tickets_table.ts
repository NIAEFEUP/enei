import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tickets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps({ defaultToNow: true })

      table.string('name').notNullable()
      table.text('description').notNullable()
      table.decimal('price', 2).notNullable()
      table.integer('stock').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
