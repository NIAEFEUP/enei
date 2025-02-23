import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import ParticipantProfile from './participant_profile.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Account from './account.js'
import { UserTypes } from '../../types/user.js'
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

  @hasMany(() => Account)
  declare accounts: HasMany<typeof Account>

  // Profiles

  @column()
  declare participantProfileId: number | null

  @belongsTo(() => ParticipantProfile)
  declare participantProfile: BelongsTo<typeof ParticipantProfile>

  @column()
  declare points: number

  @belongsTo(() => PromoterInfo)
  declare promoterInfo: BelongsTo<typeof PromoterInfo>

  // Functions

  isEmailVerified() {
    return this.emailVerifiedAt !== null
  }

  groups() {
    const groups = []

    if(this.participantProfile) groups.push(UserTypes.PARTICIPANT)

    if(this.promoterInfo) groups.push(UserTypes.PROMOTER)

    return groups
  }
}
