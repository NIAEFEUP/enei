import { DateTime } from "luxon";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import Payment from "./payment.js";
import type { CreateReadonlyModel } from "../../types/lucid.js";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import { lazy } from "#lib/lazy.js";
import { relations } from "#lib/lucid/relations.js";

export type ReadonlyInvoiceInfo = CreateReadonlyModel<InvoiceInfo>;

const invoiceInfoRelations = lazy(() => relations(InvoiceInfo, (r) => [r.many("payments")]));
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
    return invoiceInfoRelations.get().for(this);
  }
}
