import ParticipantProfile from '#models/participant_profile'
import User from '#models/user'
import { createProfileValidator } from '#validators/profile'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async index({ auth, inertia, params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      response.notFound("Participante não encontrado")
      return
    }

    const isUser = auth.user ? (user.id === auth.user!.id) : false;

    await user.load('participantProfile')
    if (!user.participantProfile) {
      if (isUser) {
        response.redirect().toRoute('pages:signup')
      } else {
        response.notFound("Participante não encontrado")
      }
      return
    }

    return inertia.render('profile', { profile: user.participantProfile!, isUser })
  }

  async edit({ auth, inertia }: HttpContext) {
    const user = auth.user;
    await user!.load('participantProfile')

    return inertia.render('profile/edit', { profile: user!.participantProfile! })
  }

  async show({ inertia }: HttpContext) {
    return inertia.render('signup')
  }

  async create({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const data = request.body()
    data.finishedAt = data.curricularYear[1]
    data.curricularYear = data.curricularYear[0]
    // HACK
    data.transports = data.transports
      .map((item: { label: string; value: string; }) => item.value)
    data.attendedBeforeEditions = data.attendedBeforeEditions
      .map((item: { label: string; value: string; }) => item.value)
    data.dietaryRestrictions ||= ""
    data.reasonForSignup ||= ""

    const profile = await createProfileValidator.validate(data)

    const profileAdd = new ParticipantProfile()
    profileAdd.fill(profile)

    await user.related('participantProfile').associate(profileAdd)

    return response.redirect().toRoute('pages:tickets')
  }
}
