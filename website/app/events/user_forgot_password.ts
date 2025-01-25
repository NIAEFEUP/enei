import { BaseEvent } from '@adonisjs/core/events'

export default class UserForgotPassword extends BaseEvent {
  constructor(public readonly email: string) {
    super()
  }
}