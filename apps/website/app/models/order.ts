import { DateTime } from "luxon";
import { BaseModel, column, manyToMany, belongsTo } from "@adonisjs/lucid/orm";
import type { ManyToMany,BelongsTo } from "@adonisjs/lucid/types/relations";
import Product from "./product.js";
import User from "./user.js";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare requestId: string;

  @column()
  declare userId: number;

  @column()
  declare name: string;

  @column()
  declare nif: number;

  @column()
  declare address: string;

  @column()
  declare status: string;

  @column()
  declare total: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Product, {
    pivotTable: "order_products",
  })

  public products!: ManyToMany<typeof Product>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
