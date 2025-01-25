import Ticket from '#models/ticket'
import type { HttpContext } from '@adonisjs/core/http'

export default class TicketsController {
  async index({ inertia }: HttpContext) {
    const ticketTypes = await Ticket.all()

    return inertia.render('tickets', { ticketTypes })
  }
}
