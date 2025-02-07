import { compose } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Account from './account.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { HasReferralLink } from '#models/mixins/has_referral_link'

export default class User extends compose(BaseModel, HasReferralLink) {
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

  isEmailVerified() {
    return this.emailVerifiedAt !== null
  }

  getPromoterCode(): number {
    return this.id
  }
}