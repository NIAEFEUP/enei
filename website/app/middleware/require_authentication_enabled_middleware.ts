import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RequireAuthEnabledMiddleware {
  async handle({ response }: HttpContext, next: NextFn) {
    if (env.get("INERTIA_PUBLIC_AUTHENTICATION_ENABLED")) {
      return next()
    }

    return response.unauthorized()
  }
}