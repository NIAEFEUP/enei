import Account from '#models/account'
import { socialAccountLoginValidator } from '#validators/account'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

async function getOrCreate(search: Pick<Account, 'provider' | 'providerId'>) {
  const account = await Account.firstOrCreate({
    provider: search.provider,
    providerId: search.providerId,
  })

  return account
}

export default class AuthenticationController {
  async login({ request, auth, response, inertia }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      response.redirect('/')
    } catch (error) {
      return inertia.render('login', {
        errors: {
          oauth: 'Email ou palavra-passe incorretos',
        },
      })
    }
  }

  async initiateGithubLogin({ ally, inertia }: HttpContext) {
    const url = await ally.use('github').redirectUrl()
    console.log(url)
    return inertia.location(url)
  }

  async callbackForGithubLogin({ response, ally }: HttpContext) {
    const github = ally.use('github')
    const user = await github.user()

    const data = await socialAccountLoginValidator.validate(user)
    console.log(data)

    const account = await getOrCreate({
      provider: 'github',
      providerId: data.id,
    })

    return response.json({ user, account: account.serialize() })
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
