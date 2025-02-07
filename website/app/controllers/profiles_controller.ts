import ParticipantProfile from '#models/participant_profile'
import { createProfileValidator } from '#validators/profile_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  // To be used when the profile page is done
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    await user.load('participantProfile')
    return inertia.render('profile', user.participantProfile!)
  }

  async show({ inertia, request }: HttpContext) {
    return inertia.render('signup', { csrfToken: request.csrfToken })
  }

  async create({ auth, request, response }: HttpContext) {
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

    // add user_id
    data.userId = auth.user?.id
    await auth.user?.load('participantProfile')

    const profile = await createProfileValidator.validate(data, {
      meta: { userId: auth.user!.id },
    })

    const profileAdd = new ParticipantProfile()
    profileAdd.fill(profile)

    await profileAdd.save()

    return response.redirect().toRoute('pages:tickets.show')
  }
}
