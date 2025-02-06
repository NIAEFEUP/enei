import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('user_id').notNullable()

      // General Info
      table.string('firstName')
      table.string('lastName')
      table.string('email')
      table.date('dateOfBirth')
      table.string('phone')

      // Student Info
      table.string('university')
      table.string('course')
      table.integer('curricularYear')
      table.integer('finishedAt')
      table.string('state')

      // Communication Info
      table.string('heardAboutENEI')
      table.string('reasonForSignup')
      // attendedBeforeEditions: string[]

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
