import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'participant_profiles'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('slug')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('slug').unique()
    })
  }
}