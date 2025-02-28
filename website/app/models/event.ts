import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare title: string

  @column()
  declare description: string

  @column.dateTime()
  declare date: DateTime

  @column()
  declare duration: number

  @column()
  declare location: string

  // TODO: Add speakers relationship

  @column()
  declare registrationRequirements: string

  @column()
  declare requiresRegistration: boolean

  @column()
  declare ticketsRemaining: number

  @column()
  declare price: number

}
