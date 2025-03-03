import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from './product.js'
import Order from './order.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare orderId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
}
