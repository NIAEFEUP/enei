import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { SocialProviders } from '@adonisjs/ally/types'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import User from './user.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['provider', 'providerId'],
  passwordColumnName: 'password',
})

export default class Account extends compose(BaseModel, AuthFinder) {
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare provider: 'credentials' | keyof SocialProviders

  @column()
  declare providerId: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare user_id: number

  @hasOne(() => User)
  declare user: HasOne<typeof User>
}
