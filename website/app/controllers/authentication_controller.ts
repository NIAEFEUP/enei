import Account from '#models/account'
import type { HttpContext } from '@adonisjs/core/http'
import {
  registerWithCredentialsValidator,
  emailVerificationCallbackValidator,
  loginWithCredentialsValidator,
  passwordResetValidator,
} from '#validators/authentication'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import UserCreated from '#events/user_created'
import SendVerificationEmail from '#listeners/send_verification_email'
import { errors } from '@adonisjs/auth'

@inject()
export default class AuthenticationController {
  constructor(private userService: UserService) {}

  async login({ request, auth, session, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginWithCredentialsValidator)

    try {
      const account = await Account.verifyCredentials(`credentials:${email}`, password)

      await account.load('user')
      await auth.use('web').login(account.user)

      if (!account.user.isEmailVerified())
        return response.redirect().toRoute('pages:auth.verify')

      return response.redirect().toRoute('pages:home')
      
    } catch (error) {
      if (error instanceof errors.E_INVALID_CREDENTIALS) {
        session.flashErrors({ password: 'As credenciais que introduziste não são válidas' })
        return response.redirect().back()
      }

      throw error
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('pages:home')
  }

  async register({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(registerWithCredentialsValidator)

    const user = await this.userService.createUserWithCredentials(email, password)
    await auth.use('web').login(user)

    return response.redirect().toRoute('pages:auth.verify')
  }

  async retryEmailVerification({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const listener = new SendVerificationEmail()
    listener.handle(new UserCreated(user))

    return response.redirect().toRoute('pages:auth.verify')
  }

  async callbackForEmailVerification({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(emailVerificationCallbackValidator)
    await this.userService.verifyEmail(email)

    return response.redirect().toRoute('actions:auth.verify.success')
  }

  async sendForgotPassword({ request, response }: HttpContext) {
    const { email } = request.only(['email'])

    /*
      According to OWASP recommendations, the existence of the account should be transparent
      to the person who issues this request, but we should not send an email that is not in
      any account.
    */
    if(await Account.findBy('id', `credentials:${email}`)) {
      await this.userService.sendForgotPasswordEmail(email)
    }

    return response.redirect().toRoute('page:auth.forgot-password.sent')
  }

  async callbackForForgotPassword({ request, inertia }: HttpContext) {
    const { email } = await request.validateUsing(emailVerificationCallbackValidator)

    return inertia.render('auth/forgot-password/reset', { email })
  }

  async changePassword({ request, response }: HttpContext) {
    const { 
      password, 
      email 
    } = await request.validateUsing(passwordResetValidator)

    const account = await Account.find(`credentials:${email}`)
    if (account) {
      account.password = password // Auther mixin hashes it automatically on assignment
      await account.save()
    }

    return response.redirect().toRoute('actions:auth.forgot-password.success')
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
