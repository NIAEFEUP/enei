import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // General Info
  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare age: number

  @column()
  declare phoneNumber: string

  // Student Info
  @column()
  declare university: string

  @column()
  declare year: number

  @column()
  declare isComplete: boolean

  @column()
  declare state: string

  @column()
  declare country: string

  // Logistics Info
  @column()
  declare shirtSize: string

  @column()
  declare foodRestrictions: string

  @column()
  declare isVegetarian: boolean

  @column()
  declare transportation: string[]

  // Communication Info
  @column()
  declare heardOf: string

  @column()
  declare whyAttend: string

  @column()
  declare previousExperience: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
