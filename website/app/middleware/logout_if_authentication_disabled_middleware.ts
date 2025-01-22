import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LogoutIfAuthenticationDisabledMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (!env.get('INERTIA_PUBLIC_AUTHENTICATION_ENABLED')) {
      await ctx.auth.use('web').logout()
    }

    return next()
  }
}
