import ParticipantProfile from '#models/participant_profile'
import { UserActivityService } from '#services/user_activity_service';
import { createProfileValidator } from '#validators/profile'
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import slug from 'slug';
import Sqids from 'sqids'

const sludSqids = new Sqids({
  alphabet: 'nkzm6vl3170gtx8uro9aj4iyqhwdpcebsf52' // lowercase letters and numbers
})

@inject()
export default class ProfilesController {
  constructor(private userActivityService: UserActivityService) {}

  async default({ auth, response }: HttpContext) {
    const user = auth.user;
    await user!.load('participantProfile')

    if (!user?.participantProfile)
      return response.redirect().toRoute('pages:signup')

    return response.redirect().toRoute('pages:profile.show', { slug: user.participantProfile.slug } )
  }

  async index({ auth, inertia, params, response }: HttpContext) {
    const profile = await ParticipantProfile.findBy('slug', params.slug)

    if (!profile) {
      response.notFound("Participante não encontrado")
      return
    }

    await profile.load('user')
    if (!profile.user) {
      response.notFound("Participante não encontrado")
      return
    }

    const isUser = profile.user ? (profile.user.id === auth.user?.id) : false;

    const activityInformation = await this.userActivityService.getActivityInformation(profile.user!)

    return inertia.render('profile', { profile, isUser, activityInformation })
  }

  async edit({ auth, inertia, response }: HttpContext) {
    const user = auth.user;
    await user!.load('participantProfile')

    if (!user?.participantProfile)
      return response.redirect().toRoute('pages:signup')

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

    data.slug = slug(`${data.firstName} ${data.lastName} ${sludSqids.encode([user.id])}`)

    const profile = await createProfileValidator.validate(data)

    const profileAdd = new ParticipantProfile()
    profileAdd.fill(profile)

    await user.related('participantProfile').associate(profileAdd)

    return response.redirect().toRoute('pages:profile.default')
  }
  
}
