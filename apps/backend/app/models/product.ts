import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { ModelAttributes } from '@adonisjs/lucid/types/model';

export type SerializedProduct = ModelAttributes<Product>;

import type { ProductRestrictions } from '#types/product'

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
  declare stock: number;

  @column()
  declare currency: string;

  @column()
  declare max_order: number;

  @column()
  declare image: string;

  @column()
  declare hidden: boolean

  @column()
  declare productGroupId: number

  @column({
    consume: (value: string) => JSON.parse(value),
    serialize: (value: ProductRestrictions) => JSON.stringify(value),
  })
  declare restrictions: ProductRestrictions

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
