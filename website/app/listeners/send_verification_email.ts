import UserCreated from '#events/user_created'
import EmailVerificationNotification from '#mails/email_verification_notification'
import env from '#start/env'
import app from '@adonisjs/core/services/app'

export default class SendVerificationEmail {
  async handle(event: UserCreated) {
    // Don't send the verification e-mail if the user has already verified it
    if (event.user.emailVerifiedAt) return

    const mailer = await app.container.make('mail.manager')
    const router = await app.container.make('router')

    const email = event.user.email

    const notification = new EmailVerificationNotification({
      email,
      logoUrl: '/images/logo-white.svg',

      verificationLink: router
        .builder()
        .qs({ email })
        .prefixUrl(env.get("INERTIA_PUBLIC_APP_URL"))
        .makeSigned('auth.verify', { expiresIn: '1h' }),  
    })

    await mailer.send(notification)
  }
}
