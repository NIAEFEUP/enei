import { BaseEvent } from "#lib/adonisjs/events.js";
import User from "#models/user";

export default class UserCreated extends BaseEvent {
  constructor(public readonly user: User) {
    super();
  }
}
