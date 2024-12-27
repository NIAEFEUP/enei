import env from '#start/env'
import { BaseMail } from '@adonisjs/mail'

export default class ExampleENotification extends BaseMail {
  private userEmail: string

  from = env.get('FROM_EMAIL')
  subject = 'This is an example email'

  constructor(userEmail: string) {
    super()

    this.userEmail = userEmail
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
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
