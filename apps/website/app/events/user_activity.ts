import type User from "#models/user";
import { BaseEvent } from "#lib/adonisjs/events.js";
import type { UserActivityDescription } from "../../types/user_activity.js";

export default class UserActivity extends BaseEvent {
  constructor(
    public readonly user: User,
    public readonly data: UserActivityDescription,
  ) {
    super();
  }
}
