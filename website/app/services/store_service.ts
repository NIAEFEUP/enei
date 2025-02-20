import Product from '#models/product'
import db from '@adonisjs/lucid/services/db'
import type User from '#models/user'
import Order from '#models/order'
import OrderProduct from '#models/order_product'

export class StoreService {
  async getProducts() {
    return await Product.query().where('currency', 'points')
  }

  async buyProduct(product_id: number, user: User) {
    await db.transaction(async (trx) => {
      const product = await Product.findBy('id', product_id, { client: trx })
      if (!product) return null

      user.useTransaction(trx)
      user.points = Math.max(0, user.points - product.price)
      await user.save()

      product.useTransaction(trx)
      product.stock = Math.max(0, product.stock - 1)
      await product.save()

      const order = await Order.create({
        userId: user.id,
      }, {
        client: trx
      })

      return await OrderProduct.create({
        orderId: order.id,
        productId: product.id,
        quantity: 1,
      }, {
        client: trx
      })
    })
  }
}
