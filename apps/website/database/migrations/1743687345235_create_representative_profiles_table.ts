import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'representative_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps({defaultToNow: true})

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('job_title').notNullable()
      table.string('ORCID_link')
      table.integer('company_id').references('id').inTable('companies')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}