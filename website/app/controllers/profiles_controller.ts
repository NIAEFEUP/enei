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

    console.log("ProfileController", auth.user!.id, data)

    console.log("before validate")
    try{
      const profile1 = await createProfileValidator.validate(data)
      console.log("profile11", profile1)
    }
    catch (e) {
      console.log("validation error", e)
    }
    const profile = await request.validateUsing(createProfileValidator, {
      meta: { userId: auth.user!.id },
    })

    console.log("profile", profile)

    const profileAdd = new Profile()
    profileAdd.fill(profile)

    console.log("profileAdd", profileAdd)
    await profileAdd.save()
  }
}
