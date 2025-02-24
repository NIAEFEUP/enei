import OrderProduct from '#models/order_product'
import Product, { type SerializedProduct } from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class TicketsController {
  async index({ inertia }: HttpContext) {
    const ticketTypes = await Product.all()

    const tickets = await Promise.all(
      ticketTypes.map(async (ticketType) => {
        const successfulOrdersOfGivenProduct = await OrderProduct.query()
          .join('orders', 'order_products.order_id', 'orders.id')
          .where('order_products.product_id', ticketType.id)
          .whereIn('orders.status', ['Success', 'Pending'])

        const stockUsed = successfulOrdersOfGivenProduct.reduce(
          (acc, orderProduct) => acc + orderProduct.quantity,
          0
        )

        const serializedProduct = ticketType.toJSON() as SerializedProduct
        const outOfStock = stockUsed >= ticketType.stock

        return { ...serializedProduct, outOfStock }
      })
    )

    return inertia.render('tickets', { ticketTypes: tickets })
  }

  async showPayment({ inertia, auth, params }: HttpContext) {
    const ticket = await Product.find(params.id)

    return inertia.render('payments', { ticket, user: auth.user })
  }
}
