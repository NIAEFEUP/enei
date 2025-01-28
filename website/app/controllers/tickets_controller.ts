import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
export default class TicketsController {
  async index({ inertia }: HttpContext) {
    const ticketTypes = await Product.all()

    return inertia.render('tickets', { ticketTypes })
  }

  async showPayment({ inertia, params }: HttpContext) {
    const ticket = await Product.find(params.id)
    return inertia.render('payments/index', { ticket })
  }
}
