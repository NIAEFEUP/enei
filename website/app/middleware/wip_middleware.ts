import { errors } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class WipMiddleware {
  async handle({request}: HttpContext, _next: NextFn) {
    throw new errors.E_ROUTE_NOT_FOUND([request.method(), request.url()])
  }
}