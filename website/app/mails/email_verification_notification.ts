import { ReactNotification } from './base/react_notification.js'
import type { EmailVerificationProps } from '#resources/emails/authentication/email_verification'

export default class EmailVerificationNotification extends ReactNotification {
  constructor(private props: EmailVerificationProps) {
    super()
  }

  async prepare() {
    this.message.to(this.props.email).subject('Confirma o teu e-mail!')

    await this.jsx(() => import('#resources/emails/authentication/email_verification'), this.props)
  }
}
