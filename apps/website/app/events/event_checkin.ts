import { BaseEvent } from "#lib/adonisjs/events.js";
import type User from "#models/user";

export default class EventCheckin extends BaseEvent {
    constructor(
        public readonly points: number,
        public readonly user: User
    ) {
        super();
    }
}