import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'promoter_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps({ defaultToNow: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
