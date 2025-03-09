import type { HttpContext } from '@adonisjs/core/http'

export default class EventsController {
  async index({inertia}: HttpContext) {
    return inertia.render('events')
  }
}
