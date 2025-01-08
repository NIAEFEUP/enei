import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'
export default class ConfirmPaymentNotification extends BaseMail {
  private userEmail: string
  from = env.get('FROM_EMAIL')
  subject = 'Your Payment was completed'

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */

  constructor(userEmail: string) {
    super()

    this.userEmail = userEmail
  }

  async prepare() {
    this.message
      .to(this.userEmail)
      .subject(this.subject)
      .htmlView('emails/example_email_html', {
        userEmail: this.userEmail,
      })
      .textView('emails/example_email_text', {
        userEmail: this.userEmail,
      })
  }
}
