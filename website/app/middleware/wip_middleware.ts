import { errors } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import type { NextFn } from '@adonisjs/core/types/http'

export default class WipMiddleware {
  async handle({ request }: HttpContext, _next: NextFn) {
    if (app.nodeEnvironment === 'production') {
      throw new errors.E_ROUTE_NOT_FOUND([request.method(), request.url()])
    }

    return _next()
  }
}