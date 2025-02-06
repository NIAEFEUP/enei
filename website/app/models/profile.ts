import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare userId: number

  // General Info
  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column.date()
  declare dateOfBirth: DateTime

  @column()
  declare phone: string

  // Student Info
  @column()
  declare university: string

  @column()
  declare course: string

  @column()
  declare curricularYear: string

  @column()
  declare finishedAt: number | null

  @column()
  declare municipality: string

  // Logistics Info
  @column()
  declare shirtSize: string

  @column()
  declare dietaryRestrictions: string

  @column()
  declare isVegetarian: boolean

  @column()
  declare isVegan: boolean

  @column()
  declare transports: string[]

  // Communication Info
  @column()
  declare heardAboutENEI: string

  @column()
  declare reasonForSignup: string

  @column()
  declare attendedBeforeEditions: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
