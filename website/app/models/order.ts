import { DateTime } from 'luxon'
import type { BelongsTo, ManyToMany } from   '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import Product from './product.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare requestId: string

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare nif: number

  @column()
  declare address: string

  @column()
  declare status: string

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
  @manyToMany(() => Product, {
    pivotTable: 'order_products',
    pivotForeignKey: 'order_id',
    pivotRelatedForeignKey: 'product_id',
    pivotColumns: ['quantity']
  })
  declare products: ManyToMany<typeof Product>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
