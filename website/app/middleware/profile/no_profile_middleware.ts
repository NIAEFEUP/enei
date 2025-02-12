import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class NoProfileMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail()

    if (user.participantProfileId !== null) {
      return ctx.response.redirect().toRoute('pages:home')
    }

    return await next()
  }
}
