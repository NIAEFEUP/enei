import { loggerStorage } from '#lib/adonisjs/logger.js'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SetupLoggerStorageMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    return loggerStorage.run(ctx.logger, next)
  }
}