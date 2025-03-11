import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApiKeyProtectedMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const { apiKey } = request.only(['apiKey'])

    if(apiKey !== env.get('APP_KEY')) response.badRequest("Invalid credentials")

    return await next()
  }
}