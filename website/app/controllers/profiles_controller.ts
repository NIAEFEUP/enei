import Profile from '#models/profile'
import { createProfileValidator } from '#validators/profile_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  // To be used when the profile page is done
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    await user.preload('profile')
    return inertia.render('profile', user.profile!)
  }

  async show({ inertia, request }: HttpContext) {
    return inertia.render('signup', { csrfToken: request.csrfToken })
  }

  async create({ auth, request }: HttpContext) {
    const data = request.body()
    delete data._csrf;
    data.finishedAt = data.curricularYear[1]
    data.curricularYear = data.curricularYear[0]
    // HACK
    data.transports = data.transports
      .map((item: { label: string; value: string; }) => item.value)
    data.attendedBeforeEditions = data.attendedBeforeEditions
      .map((item: { label: string; value: string; }) => item.value)

    console.log("ProfileController", auth.user!.id, data)

    const profile = await createProfileValidator.validate(data)

    console.log("profile", profile)

    // TODO: The steps below
    return

    const profileAdd = new Profile()
    profileAdd.fill(profile)

    console.log("profileAdd", profileAdd)
    await profileAdd.save()
  }
}
