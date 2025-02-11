import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import ParticipantProfile from './participant_profile.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Account from './account.js'
import PromoterInfo from './promoter_info.js'

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

  @column()
  declare isAdmin: boolean

  @hasMany(() => Account)
  declare accounts: HasMany<typeof Account>

  // Profiles

  @column()
  declare participantProfileId: number | null

  @belongsTo(() => ParticipantProfile)
  declare participantProfile: BelongsTo<typeof ParticipantProfile>

  // PromoterInfo

  @column()
  declare promoterInfoId: number | null

  @belongsTo(() => PromoterInfo)
  declare promoterInfo: BelongsTo<typeof PromoterInfo>

  // Functions

  isEmailVerified() {
    return this.emailVerifiedAt !== null
  }
}