import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Profile extends BaseModel {
  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

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
  declare dietaryRestrictions: string | null

  @column()
  declare isVegetarian: boolean

  @column()
  declare isVegan: boolean

  @column({
    serialize: (value: string | null) => value ? value.split(',') : [],
    prepare: (value: string[]) => value.join(',')
  })
  declare transports: string[]

  // Communication Info
  @column()
  declare heardAboutENEI: string

  @column()
  declare reasonForSignup: string | null

  @column({
    serialize: (value: string | null) => value ? value.split(',') : [],
    prepare: (value: string[]) => value.join(',')
  })
  declare attendedBeforeEditions: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
