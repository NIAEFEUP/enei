import { BaseEvent } from "#lib/adonisjs/events.js";
import type Payment from "#models/payment";

export default class PaymentStatusUpdated extends BaseEvent {
  constructor(public readonly payment: Payment) {
    super();
  }
}
