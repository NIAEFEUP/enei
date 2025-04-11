import { DateTime } from "luxon";
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import InvoiceInfo from "./invoice_info.js";
import type { StrictExclude, StrictExtract } from "#lib/types.js";
import type { CreateReadonlyModel } from "../../types/lucid.js";
import Order from "./order.js";
import { Money } from "#lib/payments/money.js";
import { money } from "#lib/lucid/decorators.js";
import { lazy } from "#lib/lazy.js";
import { relations } from "#lib/lucid/relations.js";

export type PaymentStatus = "pending" | "successful" | "declined" | "expired" | "unknown";

export type ReadonlyPayment = CreateReadonlyModel<
  Payment,
  | {
      status: StrictExclude<Payment["status"], "declined" | "unknown">;
      reason: StrictExtract<Payment["reason"], null>;
    }
  | {
      status: StrictExtract<Payment["status"], "unknown">;
      reason: StrictExclude<Payment["reason"], null>;
    }
  | {
      status: StrictExtract<Payment["status"], "declined">;
      reason: Payment["reason"];
    }
>;

const paymentRelations = lazy(() =>
  relations(Payment, (r) => [r.belongsTo("invoiceInfo"), r.belongsTo("order")]),
);

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column()
  declare status: PaymentStatus;

  @column()
  declare requestId: string;

  @money()
  declare amount: Money;

  @column()
  declare reason: string | null;

  @column()
  declare invoiceInfoId: number | null;

  @belongsTo(() => InvoiceInfo)
  declare invoiceInfo: BelongsTo<typeof InvoiceInfo>;

  @column()
  declare orderId: number | null;

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>;

  readonly() {
    return this as ReadonlyPayment;
  }

  get $relations() {
    return paymentRelations.get().for(this);
  }
}
