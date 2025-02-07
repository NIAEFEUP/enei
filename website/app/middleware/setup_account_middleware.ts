import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SetupAccountMiddleware {

  exceptions: string[] = [
    'pages:signup',
    ':auth.verify'
  ]

  isException = (route: string): boolean => {
    for (var i = 0; i < this.exceptions.length; i++)
      if (route.includes(this.exceptions[i])) return true

    return false
  }

  async handle({ auth, request, response, route }: HttpContext, next: NextFn) {
    const user = auth.user

    if (request.method() !== 'GET' || !user) {
      return next()
    }

    const routeName = route?.name || ""
    if (this.isException(routeName)) {
      return next()
    }

    if (!user.isEmailVerified()) {
      return response.redirect().toRoute('pages:auth.verify')
    }

    await user.load('profile')
    if (!user.profile) {
      return response.redirect().toRoute('pages:signup')
    }

    return next()
  }
}
