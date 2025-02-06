import type { HttpContext } from '@adonisjs/core/http'
import {
  registerWithCredentialsValidator,
  emailVerificationCallbackValidator,
  loginWithCredentialsValidator,
} from '#validators/authentication'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import UserRequestedVerificationEmail from '#events/user_requested_verification_email'

@inject()
export default class AuthenticationController {
  constructor(private userService: UserService) {}

  async login({ request, auth, session, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginWithCredentialsValidator)

    const user = await this.userService.getUserWithCredentials(email, password)
    if (!user) {
      session.flashErrors({ password: 'As credenciais que introduziste não são válidas' })
      return response.redirect().back()
    }

    await auth.use('web').login(user)

    return user.isEmailVerified()
      ? response.redirect().toRoute('pages:home')
      : response.redirect().toRoute('pages:auth.verify')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('pages:home')
  }

  async register({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(registerWithCredentialsValidator)

    const [user, events] = await this.userService.createUserWithCredentials(email, password)
    const [success] = await events
    if (!success) {

    }

    await auth.use('web').login(user)

    return response.redirect().toRoute('pages:auth.verify')
  }

  async retryEmailVerification({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    UserRequestedVerificationEmail.tryDispatch(user)

    return response.redirect().toRoute('pages:auth.verify')
  }

  async callbackForEmailVerification({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(emailVerificationCallbackValidator)
    await this.userService.verifyEmail(email)

    return response.redirect().toRoute('pages:auth.verify.success')
  }

  // SOCIAL AUTHENTICATION

  // async initiateGithubLogin({ ally, inertia }: HttpContext) {
  //   const url = await ally.use('github').redirectUrl()
  //   return inertia.location(url)
  // }

  // async callbackForGithubLogin({ ally }: HttpContext) {
  //   const github = ally.use('github')
  //   const user = await github.user()

  //   const data = await socialAccountLoginValidator.validate(user)
  //   console.log(data)

  //   const account = await getOrCreate({
  //     provider: 'github',
  //     providerId: data.id,
  //   })

  //   return response.json({ user, account: account.serialize() })
  // }

  // async initiateGoogleLogin({ ally, inertia }: HttpContext) {
  //   const url = await ally.use('google').redirectUrl()
  //   return inertia.location(url)
  // }

  // async callbackForGoogleLogin({ response, ally }: HttpContext) {
  //   const google = ally.use('google')
  //   const user = await google.user()

  //   return response.json({ user })
  // }

  // async initiateLinkedinLogin({ ally, inertia }: HttpContext) {
  //   const url = await ally.use('linkedin').redirectUrl()
  //   return inertia.location(url)
  // }

  // async callbackForLinkedinLogin({ response, ally }: HttpContext) {
  //   const linkedin = ally.use('linkedin')
  //   const user = await linkedin.user()

  //   return response.json({ user })
  // }
}
