import { SocialProviders } from '@adonisjs/ally/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { messages } from '../messages.js'

export default class VerifySocialCallbackMiddleware {
  async handle(
    { response, session, ally }: HttpContext,
    next: NextFn,
    options: { provider: keyof SocialProviders }
  ) {
    const oauth = ally.use(options.provider)

    if (oauth.accessDenied()) {
      session.flashErrors({ oauth: messages.auth.oauth.accessDenied })
      return response.redirect('/login')
    }

    if (oauth.stateMisMatch()) {
      session.flashErrors({ oauth: messages.auth.oauth.stateMismatch })
      return response.redirect('/login')
    }

    const postRedirectError = oauth.getError()
    if (postRedirectError) {
      session.flashErrors({ oauth: postRedirectError })
      return response.redirect('/login')
    }

    const output = await next()

    return output
  }
}
