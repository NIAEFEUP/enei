import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class VerifyUrlSignatureMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Invalid or expired URL')
    }

    const output = await next()
    return output
  }
}
