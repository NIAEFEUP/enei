import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import SpeakerProfile from './speaker_profile.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

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

  @column()
  declare type: string

  @column()
  declare companyImage: string

  @column.dateTime()
  declare date: DateTime

  @column()
  declare duration: number

  @column()
  declare location: string

  @manyToMany(() => SpeakerProfile, {
    pivotTable: 'event_speakers',
  })
  public speakers!: ManyToMany<typeof SpeakerProfile>

  @manyToMany(() => User, {
    pivotTable: 'event_users',
  })
  public registeredUsers!: ManyToMany<typeof User>

  @column()
  declare registrationRequirements: string

  @column()
  declare requiresRegistration: boolean

  @column()
  declare ticketsTotal: number

  @column()
  declare ticketsRemaining: number

  @column()
  declare price: number

  public getFormattedDate() {
    return this.date.toFormat('dd-MM-yyyy')
  }

  public getFormattedTime() {
    const endTime = this.date.plus({ minutes: this.duration })
    return `${this.date.toFormat('HH:mm')} - ${endTime.toFormat('HH:mm')}`
  }
}
