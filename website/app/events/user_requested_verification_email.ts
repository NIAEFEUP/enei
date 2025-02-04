import type User from '#models/user'
import { BaseEvent } from '@adonisjs/core/events'

export default class UserRequestedVerificationEmail extends BaseEvent {
  constructor(public readonly user: User) {
    super()
  }
}
