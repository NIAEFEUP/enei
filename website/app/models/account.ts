import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { SocialProviders } from '@adonisjs/ally/types'
import User from './user.js'

export default class Account extends BaseModel {
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare provider: 'credentials' | keyof SocialProviders

  @column()
  declare providerId: string

  @column()
  declare providerData: any

  @hasOne(() => User)
  declare user: HasOne<typeof User>
}
