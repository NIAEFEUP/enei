import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.integer('user_id')
        .notNullable()
        .unique()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      // General Info
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.date('date_of_birth').notNullable()
      table.string('phone').notNullable()

      // Student Info
      table.string('university').notNullable()
      table.string('course').notNullable()
      table.string('curricular_year').notNullable()
      table.integer('finished_at').nullable()
      table.string('municipality').notNullable()

      // Logistics Info
      table.string('shirt_size').notNullable()
      table.string('dietary_restrictions').nullable()
      table.boolean('is_vegetarian').notNullable()
      table.boolean('is_vegan').notNullable()
      table.json('transports').nullable()

      // _communication _info
      table.string('heard_about_enei').notNullable()
      table.string('reason_for_signup').nullable()
      table.json('attended_before_editions').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
