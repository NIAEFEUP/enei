import { DateTime } from "luxon";
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import InvoiceInfo from "./invoice_info.js";
import * as is from "@sindresorhus/is";
import type { StrictExclude, StrictExtract } from "#lib/types.js";
import type { CreateReadonlyModel } from "../../types/lucid.js";
import Order from "./order.js";

type PaymentStatus = "pending" | "successful" | "declined" | "expired" | "unknown";

export type ReadonlyPayment = CreateReadonlyModel<
  Payment,
  | {
      status: StrictExclude<Payment["status"], "unknown">;
      reason: StrictExtract<Payment["reason"], null>;
    }
  | {
      status: StrictExtract<Payment["status"], "unknown">;
      reason: StrictExclude<Payment["reason"], null>;
    }
>;

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

  @column()
  declare amount: number;

  @column()
  declare reason: string | null;

  @column()
  declare invoiceInfoId: number | null;

  @belongsTo(() => InvoiceInfo)
  declare invoiceInfo: BelongsTo<typeof InvoiceInfo>;

  @column()
  declare orderId: number;

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>;

  readonly(): ReadonlyPayment {
    return this as ReadonlyPayment;
  }

  get $relations() {
    return new (class {
      constructor(private payment: Payment) {}

      async invoiceInfo() {
        if (is.isNullOrUndefined(this.payment.invoiceInfoId)) {
          return null;
        } else if (is.isNullOrUndefined(this.payment.invoiceInfo)) {
          await this.payment.loadOnce("invoiceInfo");
        }

        return this.payment.invoiceInfo;
      }

      async order() {
        if (is.isNullOrUndefined(this.payment.order)) {
          await this.payment.loadOnce("order");
        }

        return this.payment.order;
      }
    })(this);
  }
}
