import { BaseEvent } from "@adonisjs/core/events";

export default class UserChangeEmailRequest extends BaseEvent {
  constructor(
    public readonly changeId: string,
    public readonly oldEmail: string,
    public readonly newEmail: string,
  ) {
    super();
  }
}
