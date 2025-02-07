import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class ParticipantProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

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
  declare shirtSizeProfile: string

  @column()
  declare dietaryRestrictions: string | null

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
  declare reasonForSignup: string | null

  @column()
  declare attendedBeforeEditions: string[]
}
