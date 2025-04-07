import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, hasMany, manyToMany } from "@adonisjs/lucid/orm";
import type { BelongsTo, HasMany, ManyToMany } from "@adonisjs/lucid/types/relations";
import Product from "./product.js";
import User from "./user.js";
import Payment from "./payment.js";
import * as is from "@sindresorhus/is";
import type { CreateReadonlyModel } from "../../types/lucid.js";

export type OrderStatus =
  | "draft"
  | "pending-payment"
  | "canceled"
  | "pending-delivery"
  | "delivered";

export type ReadonlyOrder = CreateReadonlyModel<Order>;

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

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

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
    return new (class {
      constructor(private order: Order) {}

      async user() {
        if (is.isNullOrUndefined(this.order.user)) {
          await this.order.loadOnce("user");
        }

        return this.order.user;
      }

      async payments() {
        if (is.isNullOrUndefined(this.order.payments)) {
          await this.order.loadOnce("payments");
        }

        return this.order.payments;
      }

      async products() {
        if (is.isNullOrUndefined(this.order.products)) {
          await this.order.loadOnce("products");
        }

        return this.order.products;
      }
    })(this);
  }
}
