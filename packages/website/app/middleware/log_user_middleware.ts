import type { HttpContext } from '@adonisjs/core/http'
import { Logger } from '@adonisjs/core/logger'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LogUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await ctx.auth.check()
    const user = ctx.auth.user

    if (user) {
      ctx.logger = ctx.logger.child({ user_id: user.id })
      ctx.containerResolver.bindValue(Logger, ctx.logger)
    }

    return next()
  }
}
