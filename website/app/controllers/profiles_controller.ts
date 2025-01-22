import Profile from '#models/profile'
import { createProfileValidator } from '#validators/profileValidator'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    await user.preload('profile')
    return inertia.render('profile', user.profile!)
  }

  async create({ auth, request }: HttpContext) {
    const profile = await request.validateUsing(createProfileValidator, {
      meta: { userId: auth.user!.id },
    })

    const profileAdd = new Profile()
    profileAdd.fill(profile).save()
  }
}
