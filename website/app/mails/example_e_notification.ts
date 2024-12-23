import env from '#start/env'
import { BaseMail } from '@adonisjs/mail'

export default class ExampleENotification extends BaseMail {
  private userEmail: string;

  from = env.get('FROM_EMAIL')
  subject = 'This is an example email'

  constructor(userEmail: string) {
    super()

    this.userEmail = userEmail;
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    console.log(this.userEmail);
    this.message.to(this.userEmail).subject(this.subject)
  }
}