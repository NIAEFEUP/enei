import { ReactNotification } from "./base/react_notification.js";
import type { EmailChangeProps } from "#resources/emails/auth/email_change";

export default class ChangeEmailNotification extends ReactNotification {
  constructor(private props: EmailChangeProps) {
    super();
  }

  async prepare() {
    this.message.to(this.props.email).subject("Confirma a alteração de e-mail");

    await this.jsx(() => import("#resources/emails/auth/email_change"), this.props);
  }
}
