import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
<<<<<<<< HEAD:website/database/migrations/1738945449593_create_tickets_table.ts
      table.timestamps({ defaultToNow: true })

      table.string('name').notNullable()
      table.text('description').notNullable()
      table.decimal('price', 2).notNullable()
      table.integer('stock').notNullable()
|||||||| cd660f9:website/database/migrations/1734798835308_create_tickets_table.ts
      table.string('name').nullable()
      table.text('description')
      table.float('price').notNullable()
      table.integer('stock').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
========
      table.integer('request_id')
      table.string('status')
      table.integer('user_id').notNullable()
      table.string('name')
      table.integer('nif')
      table.string('address')
      table.float('total')
      table.timestamp('created_at')
      table.timestamp('updated_at')
>>>>>>>> develop:website/database/migrations/1734776385300_create_orders_table.ts
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
