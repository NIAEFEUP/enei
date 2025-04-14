import { DateTime } from "luxon";
import { BaseModel, column, manyToMany } from "@adonisjs/lucid/orm";
import type { ModelAttributes } from "@adonisjs/lucid/types/model";
import type { ManyToMany } from "@adonisjs/lucid/types/relations";

import type { ProductRestrictions } from "../../types/product.js";
import { json } from "#lib/lucid/decorators.js";
import Order from "./order.js";
import { lazy } from "#lib/lazy.js";
import { relations } from "#lib/lucid/relations.js";

export type SerializedProduct = ModelAttributes<Product>;

const productRelations = lazy(() => relations(Product, (r) => [r.many("orders")]));

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare price: number;

  @column()
  declare points: number;

  @column()
  declare stock: number;

  @column()
  declare maxOrder: number;

  @column()
  declare image: string;

  @column()
  declare hidden: boolean;

  @column()
  declare productGroupId: number;

  @column()
  declare category: "ticket" | "store" | "hidden";

  @json()
  declare restrictions: ProductRestrictions | null;

  @manyToMany(() => Order, {
    pivotTable: "order_products",
  })
  declare orders: ManyToMany<typeof Order>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  get $relations() {
    return productRelations.get().for(this);
  }
}
