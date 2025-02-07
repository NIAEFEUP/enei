import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SetupAccountMiddleware {
  async handle({ auth, request, response }: HttpContext, next: NextFn) {
    const user = auth.user
    
    if (request.method() !== 'GET' || !user) {
      return next()
    }

    if (!user.isEmailVerified()) {
      return response.redirect().toRoute('pages:auth.verify')
    }

    if (!user.profile) {
      return response.redirect().toRoute('pages:signup')
    }
  
    return next()
  }
}