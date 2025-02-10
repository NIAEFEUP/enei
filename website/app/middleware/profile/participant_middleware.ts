import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ParticipantMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail()

    if (user.participantProfileId === null) {
      return ctx.response.redirect().toRoute('pages:signup')
    }

    return await next()
  }
}
