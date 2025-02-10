import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.float('price').notNullable()
      table.integer('stock').notNullable()
      table.integer('max_order').notNullable()
      table.string('currency').notNullable()
      table.string('image').notNullable
      table.integer('product_group_id').unsigned().references('id').inTable('product_groups').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
