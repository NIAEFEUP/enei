import { DateTime } from "luxon";
import { BaseModel, column, hasMany, manyToMany, scope } from "@adonisjs/lucid/orm";
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
  | "processing"
  | "canceled"
  | "pending-payment"
  | "pending-delivery"
  | "refunded"
  | "delivered";

export type ReadonlyOrder = CreateReadonlyModel<Order>;

const orderRelations = lazy(() =>
  relations(Order, (r) => [
    r.many("payments"),
    r.withExtras<{ quantity: number }>().many("products"),
    r.requiredBelongsTo("user"),
  ]),
);

export default class Order extends BaseModel {
  static from = scope((query, user: User) => {
    query.where("user_id", user.id);
  });

  static draft = scope((query) => {
    query.where("status", "draft");
  });

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

  readonly() {
    return this as ReadonlyOrder;
  }

  get $relations() {
    return orderRelations.get().for(this);
  }

  async isEmpty() {
    const products = await this.$relations.products();
    return products.length > 0;
  }
}
