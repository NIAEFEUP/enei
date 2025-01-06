import type { HttpContext } from '@adonisjs/core/http'

export default class AuthenticationController {
  async login() {}

  async initiateGithubLogin({ ally, inertia }: HttpContext) {
    const url = await ally.use('github').redirectUrl()
    return inertia.location(url)
  }

  async callbackForGithubLogin({ response, ally }: HttpContext) {
    const github = ally.use('github')
    const user = await github.user()

    return response.json({ user })
  }

  async initiateGoogleLogin({ ally, inertia }: HttpContext) {
    const url = await ally.use('google').redirectUrl()
    return inertia.location(url)
  }

  async callbackForGoogleLogin({ response, ally }: HttpContext) {
    const google = ally.use('google')
    const user = await google.user()

    return response.json({ user })
  }

  async initiateLinkedinLogin({ ally, inertia }: HttpContext) {
    const url = await ally.use('linkedin').redirectUrl()
    return inertia.location(url)
  }

  async callbackForLinkedinLogin({ response, ally }: HttpContext) {
    const linkedin = ally.use('linkedin')
    const user = await linkedin.user()

    return response.json({ user })
  }
}
