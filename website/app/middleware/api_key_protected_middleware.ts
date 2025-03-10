import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApiKeyProtectedMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    const { apiKey } = request.only(['apiKey'])

    console.log("skill: ", env.get('APP_KEY'))
    console.log("issue: ", apiKey)

    return await next()
  }
}