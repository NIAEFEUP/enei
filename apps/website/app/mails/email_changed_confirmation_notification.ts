import { ReactNotification } from "./base/react_notification.js";
import type { EmailChangedConfirmationProps } from "#resources/emails/auth/email_changed_confirmation";

export default class EmailChangedConfirmationNotification extends ReactNotification {
  constructor(private props: EmailChangedConfirmationProps) {
    super();
  }

  async prepare() {
    this.message.to(this.props.email).subject("E-mail alterado");

    await this.jsx(() => import("#resources/emails/auth/email_changed_confirmation"), this.props);
  }
}
