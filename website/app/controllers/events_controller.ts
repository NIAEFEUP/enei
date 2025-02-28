import type { HttpContext } from '@adonisjs/core/http'
import Event from '#models/event'

export default class EventsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('events')
  }
  async show({ inertia, params }: HttpContext) {
    const event = await Event.findOrFail(params.id)

    const endTime = event.date.plus({ minutes: event.duration })

    return inertia.render('events/show', {
      title: event.title,
      description: event.description,
      date: `${event.date.year}-${String(event.date.month).padStart(2, '0')}-${String(event.date.day).padStart(2, '0')}`,
      time: `${String(event.date.hour).padStart(2, '0')}:${String(event.date.minute).padStart(2, '0')} - ${String(endTime.hour).padStart(2, '0')}:${String(endTime.minute).padStart(2, '0')}`,
      location: event.location,
      speakers: [],
      registrationRequirements: event.registrationRequirements,
      requiresRegistration: event.requiresRegistration,
      ticketsRemaining: event.ticketsRemaining,
      price: event.price,
    })
  }
}
