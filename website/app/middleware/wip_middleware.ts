import { errors } from '@adonisjs/core'
import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class WipMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    if (app.inDev) {
      return next()
    }

    throw new errors.E_ROUTE_NOT_FOUND([request.method(), request.url()])
  }
}