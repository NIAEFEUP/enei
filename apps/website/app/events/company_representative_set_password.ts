import { BaseEvent } from "#lib/adonisjs/events.js";

export default class CompanyRepresentativeSetPassword extends BaseEvent {
  constructor(public readonly email: string) {
    super();
  }
}
