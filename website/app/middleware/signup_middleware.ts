import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SignUpMiddleware {

  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.user

    if (!user)
      return response.redirect().toRoute('pages:home')

    await user.load('profile')
    if (user.profile) {
      return response.redirect().toRoute('pages:home')
    }

    return next()
  }
}
