import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RedirectIfAuthenticatedMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    if (await auth.check()) response.redirect().back()

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
