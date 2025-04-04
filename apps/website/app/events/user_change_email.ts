import { BaseEvent } from "@adonisjs/core/events";

export default class UserChangeEmail extends BaseEvent {
  constructor(
    public readonly changeId: number,
    public readonly oldEmail: string,
    public readonly newEmail: string,
  ) {
    super();
  }
}
