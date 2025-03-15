import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps({ defaultToNow: true })

      table.string('email').unique().notNullable()
      table.timestamp('email_verified_at')
    })
  }

  override async down() {
    this.schema.dropTable(this.tableName)
  }
}