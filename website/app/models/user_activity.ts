import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserActivity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare type: string

  @column()
  declare description: object

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}

