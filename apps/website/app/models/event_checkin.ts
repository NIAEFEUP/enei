import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class EventCheckin extends BaseModel {
  static table = 'event_checkins'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare eventId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare checkedInAt: DateTime
}