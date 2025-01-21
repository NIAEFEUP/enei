import Account from '#models/account'
import { socialAccountLoginValidator } from '#validators/account'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { registerWithCredentialsValidator } from '#validators/authentication'
import { UserService } from '#services/auth_service'
import { inject } from '@adonisjs/core'

export default class AuthenticationController {
  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const account = await Account.verifyCredentials(email, password)

      const user = await User.query().where('id', account.user_id).first()
      if (user) await auth.use('web').login(user)

      response.redirect('/')
    } catch (error) {
      session.flash('errors', { oauth: 'Email ou palavra-passe incorretos' })
      return response.redirect().back()
    }
  }

  @inject()
  async register({ request, auth, response }: HttpContext, userService: UserService) {
    const { email, password } = await request.validateUsing(registerWithCredentialsValidator)

    const user = await userService.createUserWithCredentials(email, password)
    await auth.use('web').login(user)

    return response.redirect().toRoute('auth.email-confirmation.show')
  }

  async showEmailConfirmation({ inertia }: HttpContext) {
    return inertia.render('email_confirmation')
  }

  async verify({ request, view }: HttpContext) {
    if (request.method() === 'POST') return request.toJSON()
    return view.render('automatic_submit')
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

    // const account = await getOrCreate({
    //   provider: 'github',
    //   providerId: data.id,
    // })

    // return response.json({ user, account: account.serialize() })
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
