import { DateTime } from "luxon";
import { BaseModel, column, hasMany, manyToMany } from "@adonisjs/lucid/orm";
import type { HasMany, ManyToMany } from "@adonisjs/lucid/types/relations";
import Product from "./product.js";
import User from "./user.js";
import Payment from "./payment.js";
import type { CreateReadonlyModel } from "../../types/lucid.js";
import { belongsTo, type RequiredBelongsTo } from "#lib/lucid/decorators.js";
import { relations } from "#lib/lucid/relations.js";
import { lazy } from "#lib/lazy.js";

export type OrderStatus =
  | "draft"
  | "pending-payment"
  | "canceled"
  | "pending-delivery"
  | "delivered";

export type ReadonlyOrder = CreateReadonlyModel<Order>;

const orderRelations = lazy(() =>
  relations(Order, (r) => [r.many("payments"), r.many("products"), r.requiredBelongsTo("user")]),
);

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column()
  declare status: OrderStatus;

  @column()
  declare pointsUsed: number;

  @column()
  declare userId: number;

  @belongsTo(() => User, {
    meta: { required: true },
  })
  declare user: RequiredBelongsTo<typeof User>;

  @hasMany(() => Payment)
  declare payments: HasMany<typeof Payment>;

  @manyToMany(() => Product, {
    pivotTable: "order_products",
  })
  declare products: ManyToMany<typeof Product>;

  readonly(): ReadonlyOrder {
    return this as ReadonlyOrder;
  }

  get $relations() {
    return orderRelations.get().for(this);
  }
}
