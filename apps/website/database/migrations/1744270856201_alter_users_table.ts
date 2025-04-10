import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("slug").nullable()
      table
        .integer("representative_profile_id")
        .references("id")
        .inTable("representative_profiles");
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("slug")
      table.dropColumn("representative_profile_id");
    })
  }
}