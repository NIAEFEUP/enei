import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Account from './account.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PromoterProfile from './promoter_profile.js'
import ParticipantProfile from './participant_profile.js'

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

  // Referrals

  @column()
  declare referringPromoterId: number | undefined

  @belongsTo(() => User, {
    foreignKey: 'promoterId',
  })
  declare referringPromoter: BelongsTo<typeof User>

  @column()
  declare referrerId: number | undefined

  @belongsTo(() => User, {
    foreignKey: 'referrerId',
  })
  declare referrer: BelongsTo<typeof User>

  // PromoterInfo

  @column()
  declare promoterProfileId: number | undefined

  @belongsTo(() => PromoterProfile)
  declare promoterProfile: BelongsTo<typeof PromoterProfile>

  // ParticipantProfile

  @column()
  declare participantProfileId: number | undefined

  @belongsTo(() => ParticipantProfile)
  declare participantProfile: BelongsTo<typeof ParticipantProfile>

  // Functions

  get role() {
    if (this.isParticipant()) return 'participant' as const
    if (this.isPromoter()) return 'promoter' as const
    return 'unknown' as const
  }

  isPromoter() {
    return !this.promoterProfileId
  }

  isParticipant() {
    return !this.participantProfileId
  }

  isEmailVerified() {
    return this.emailVerifiedAt !== null
  }

  wasReferred() {
    return !this.referrerId
  }

  static async hasPurchasedTicket(user: User) {
    if (!user.isParticipant()) return false
    
    await user.load('participantProfile')
    return !!user.participantProfile.purchasedTicket
  }

  static async getReferringPromoter(user: User) {
    await user.load('referringPromoter')
    return user.referringPromoter
  }

  static async getReferrer(user: User) {
    await user.load('referrer')
    return user.referrer
  }
}
