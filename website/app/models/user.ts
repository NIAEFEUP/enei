import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import ParticipantProfile from './participant_profile.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Account from './account.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare email: string

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  @hasMany(() => Account)
  declare accounts: HasMany<typeof Account>

  // Profiles

  @column()
  declare participantProfileId: number

  @hasOne(() => ParticipantProfile)
  declare participantProfile: HasOne<typeof ParticipantProfile>

  // Functions

  isEmailVerified() {
    return this.emailVerifiedAt !== null
  }
}
