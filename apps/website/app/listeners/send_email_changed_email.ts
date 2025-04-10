import mail from "@adonisjs/mail/services/main";
import { staticUrl } from "../url.js";
import type UserEmailChangedConfirmation from "#events/user_email_changed";
import EmailChangedConfirmationNotification from "#mails/email_changed_confirmation_notification";

export default class SendEmailChangedConfirmationEmail {
  async handle(event: UserEmailChangedConfirmation) {
    const { oldEmail, newEmail } = event;

    const oldEmailNotification = new EmailChangedConfirmationNotification({
      email: oldEmail,
      oldEmail,
      newEmail,
      logoUrl: staticUrl("/images/logo-white.png"),
    });
    const newEmailNotification = new EmailChangedConfirmationNotification({
      email: newEmail,
      oldEmail,
      newEmail,
      logoUrl: staticUrl("/images/logo-white.png"),
    });

    await mail.send(oldEmailNotification);
    await mail.send(newEmailNotification);
  }
}
