import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'staff_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.boolean('is_admin').defaultTo(false)

      table.integer('department_id').unsigned().index().references('id').inTable('departments')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}