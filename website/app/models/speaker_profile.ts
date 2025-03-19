import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Event from './event.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class SpeakerProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare jobTitle: string

  @column()
  declare profilePicture: string

  @column()
  declare company: string

  @manyToMany(() => Event, {
    pivotTable: 'event_speaker',
  })
  public events!: ManyToMany<typeof Event>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
