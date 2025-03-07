import type { HttpContext } from '@adonisjs/core/http'
import Event from '#models/event'
import User from '#models/user'

export default class EventsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('events')
  }
  async show({ inertia, params }: HttpContext) {
    const event = await Event.findOrFail(params.id)

    const endTime = event.date.plus({ minutes: event.duration })

    const speakers = await event.related('speakers').query()

    return inertia.render('events/show', {
      eventId: event.id,
      title: event.title,
      description: event.description,
      date: `${event.date.year}-${String(event.date.month).padStart(2, '0')}-${String(event.date.day).padStart(2, '0')}`,
      time: `${String(event.date.hour).padStart(2, '0')}:${String(event.date.minute).padStart(2, '0')} - ${String(endTime.hour).padStart(2, '0')}:${String(endTime.minute).padStart(2, '0')}`,
      location: event.location,
      type: event.type,
      companyImage: event.companyImage,
      speakers: speakers.map((speaker) => ({
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        jobTitle: speaker.jobTitle,
        profilePicture: speaker.profilePicture,
        company: speaker.company,
      })),
      registrationRequirements: event.registrationRequirements,
      requiresRegistration: event.requiresRegistration,
      ticketsRemaining: event.ticketsRemaining,
      price: event.price,
    })
  }

  async register({ response, params, auth }: HttpContext) {
    // Get the authenticated user
    const user = auth.user
    if (!user) {
      return response.unauthorized('Precisas de estar autenticado para te registares num evento')
    }

    // Get the event and check if it is possible do register
    const event = await Event.findOrFail(params.id)

    if (event.ticketsRemaining <= 0) {
      return response.badRequest('Já não há bilhetes disponíveis para este evento')
    }

    if (!event.requiresRegistration) {
      return response.badRequest('Este evento não requer registo')
    }

    // Register and decrease tickets remaining
    await event.related('registeredUsers').attach([user.id])

    event.ticketsRemaining--

    event.save()

    return response.ok({ message: 'Registado com sucesso' })
  }

  async ticketsRemaining({ response, params }: HttpContext) {
    const event = await Event.findOrFail(params.id)

    return response.ok({ ticketsRemaining: event.ticketsRemaining })
  }

  async isRegistered({ response, params, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized(
        'Precisas de estar autenticado para verificar se estás registado num evento'
      )
    }

    const event = await Event.findOrFail(params.id)

    const isRegistered = await event
      .related('registeredUsers')
      .query()
      .where('user_id', user.id)
      .first()

    return response.ok({ isRegistered: !!isRegistered })
  }

  async isRegisteredByEmail({ response, request }: HttpContext) {
    const email = request.input('email')

    const event = await Event.findOrFail(request.param('id'))

    const user = await User.findBy('email', email)

    if (!user) {
      return response.badRequest('Utilizador não encontrado')
    }

    const isRegistered = await event
      .related('registeredUsers')
      .query()
      .where('user_id', user.id)
      .first()

    return response.ok({ isRegistered: !!isRegistered })
  }
}
