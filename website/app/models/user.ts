import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Account from './account.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PromoterInfo from './promoter_info.js'
import ParticipantInfo from './participant_info.js'
import { compose } from '@adonisjs/core/helpers'
import { HasReferralLink } from './mixins/has_referral_link.js'
import ParticipantProfile from './participant_profile.js'

export default class User extends compose(BaseModel, HasReferralLink) {
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

  @column()
  declare referredByPromoterId: number | null

  @belongsTo(() => User, {
    foreignKey: 'referredByPromoterId'
  })
  declare referredByPromoter: BelongsTo<typeof User>

  @column()
  declare points: number

  // PromoterInfo
  @column()
  declare promoterInfoId: number | null

  @belongsTo(() => PromoterInfo)
  declare promoterInfo: BelongsTo<typeof PromoterInfo>

  // ParticipantInfo
  @column()
  declare participantInfoId: number | null

  @belongsTo(() => ParticipantInfo)
  declare participantInfo: BelongsTo<typeof ParticipantInfo>

  // Profiles
  @column()
  declare participantProfileId: number | null

  @belongsTo(() => ParticipantProfile)
  declare participantProfile: BelongsTo<typeof ParticipantProfile>

  // Functions
  isPromoter() {
    return this.promoterInfoId !== null
  }

  isParticipant() {
    return this.participantInfoId !== null
  }
    
  isEmailVerified() {
    return this.emailVerifiedAt !== null
  }

  public getPromoterCode: () => number = () => {
    return this.id;
  }
}
