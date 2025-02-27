import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.text('description').notNullable()
      table.dateTime('date').notNullable()
      table.string('duration').notNullable()
      table.string('location').notNullable()
      table.string('registration_requirements')
      table.boolean('requires_registration').defaultTo(false)
      table.integer('tickets_remaining').defaultTo(0)
      table.decimal('price', 10, 2).defaultTo(0)


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
