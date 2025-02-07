import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Account from './account.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import PromoterInfo from './promoter_info.js'
import ParticipantInfo from './participant_info.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Account)
  declare accounts: HasMany<typeof Account>

  @column()
  declare referredBy: User

  @hasOne(() => PromoterInfo)
  declare promoterInfo: HasOne<typeof PromoterInfo>

  @hasOne(() => ParticipantInfo)
  declare participantInfo: HasOne<typeof ParticipantInfo>

  isStudentAssociation() {
    return this.promoterInfo !== null
  }

  isParticipant() {
    return this.participantInfo !== null
  }

  isEmailVerified() {
    return this.emailVerifiedAt !== null
  }

}