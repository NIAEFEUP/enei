import type User from '#models/user'
import { BaseEvent } from '#lib/adonisjs/events.js'

export default class UserEmailVerified extends BaseEvent {
  constructor(public readonly user: User) {
    super()
  }
}
