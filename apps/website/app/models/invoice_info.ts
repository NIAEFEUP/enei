import { DateTime } from "luxon";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import Payment from "./payment.js";
import type { CreateReadonlyModel } from "../../types/lucid.js";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import * as is from "@sindresorhus/is";

export type ReadonlyInvoiceInfo = CreateReadonlyModel<InvoiceInfo>;

export default class InvoiceInfo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column()
  declare name: string;

  @column()
  declare nif: string;

  @column()
  declare address: string;

  /**
   * An invoice info is set as frozen if an invoice has already
   * been created using the details present in the invoice.
   */
  @column()
  declare frozen: boolean;

  @hasMany(() => Payment)
  declare payments: HasMany<typeof Payment>;

  readonly() {
    return this as ReadonlyInvoiceInfo;
  }

  get $relations() {
    return new (class {
      constructor(private invoiceInfo: InvoiceInfo) {}

      async payments() {
        if (is.isNullOrUndefined(this.invoiceInfo.payments)) {
          await this.invoiceInfo.loadOnce("payments");
        }

        return this.invoiceInfo.payments;
      }
    })(this);
  }
}
