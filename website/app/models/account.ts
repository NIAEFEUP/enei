import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { SocialProviders } from '@adonisjs/ally/types'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import User from './user.js'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['id'],
  passwordColumnName: 'password',
})

type AccountProvider = 'credentials' | keyof SocialProviders
type AccountId = `${AccountProvider}:${string}`

export default class Account extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: AccountId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  static findByCredentials(email: string) {
    return this.findForAuth(['id'], `credentials:${email}`)
  }
}
