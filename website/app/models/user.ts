import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Profile from './profile.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Account from './account.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  @hasOne(() => Profile)
  declare profile: HasOne<typeof Profile>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Account)
  declare accounts: HasMany<typeof Account>

  isEmailVerified() {
    return this.emailVerifiedAt !== null
  }
}
