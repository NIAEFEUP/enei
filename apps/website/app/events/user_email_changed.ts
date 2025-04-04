import { BaseEvent } from "@adonisjs/core/events";

export default class UserEmailChangedConfirmation extends BaseEvent {
  constructor(
    public readonly oldEmail: string,
    public readonly newEmail: string,
  ) {
    super();
  }
}
