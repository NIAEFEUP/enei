import User from '#models/user'
import { BaseEvent } from '@adonisjs/core/events'

export default class UserCreated extends BaseEvent {
  constructor(public readonly user: User) {
    super()
  }
}