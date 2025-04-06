import { DateTime } from "luxon";
import { BaseModel, column, hasMany, hasOne } from "@adonisjs/lucid/orm";
import Product from "./product.js";
import type { HasMany, HasOne } from "@adonisjs/lucid/types/relations";
import Event from "./event.js";

export default class ProductGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare maxAmountPerGroup: number | null;

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>;

  @hasOne(() => Event)
  declare event: HasOne<typeof Event>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
