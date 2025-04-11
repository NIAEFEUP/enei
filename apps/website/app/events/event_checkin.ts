import { BaseEvent } from "#lib/adonisjs/events.js";
import type Product from "#models/product";
import type User from "#models/user";

export default class EventCheckin extends BaseEvent {
    constructor(
        public readonly participationProduct: Product | null,
        public readonly user: User
    ) {
        super();
    }
}