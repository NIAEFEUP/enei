import { ReactNotification } from "./base/react_notification.js";
import type { EmailVerificationProps } from "#resources/emails/auth/email_verification";

export default class ForgotPasswordNotification extends ReactNotification {
  constructor(private props: EmailVerificationProps) {
    super();
  }

  async prepare() {
    this.message.to(this.props.email).subject("Repõe a tua palavra-passe!");

    await this.jsx(() => import("#resources/emails/auth/forgot_password"), this.props);
  }
}
