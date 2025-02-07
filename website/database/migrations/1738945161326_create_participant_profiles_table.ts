import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'participant_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps({ defaultToNow: true })

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
      table.jsonb('transports').notNullable()

      // Communications Info
      table.string('heard_about_enei').notNullable()
      table.string('reason_for_signup').nullable()
      table.jsonb('attended_before_editions').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}