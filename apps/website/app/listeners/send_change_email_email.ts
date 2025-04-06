import mail from "@adonisjs/mail/services/main";
import { buildUrl, staticUrl } from "../url.js";
import type UserChangeEmailRequest from "#events/user_change_email";
import ChangeEmailNotification from "#mails/change_email_notification";

export default class SendChangeEmailEmail {
  async handle(event: UserChangeEmailRequest) {
    const { changeId, oldEmail, newEmail } = event;

    const oldEmailNotification = new ChangeEmailNotification({
      email: oldEmail,
      oldEmail,
      newEmail,
      logoUrl: staticUrl("/images/logo-white.png"),

      cancelationLink: buildUrl()
        .qs({ id: changeId, email: oldEmail })
        .makeSigned("actions:profile.edit-email.cancel.callback", { expiresIn: "10m" }),
      confirmationLink: buildUrl()
        .qs({ id: changeId, email: oldEmail })
        .makeSigned("actions:profile.edit-email.confirm.callback", { expiresIn: "10m" }),
    });

    const newEmailNotification = new ChangeEmailNotification({
      email: newEmail,
      oldEmail,
      newEmail,
      logoUrl: staticUrl("/images/logo-white.png"),

      cancelationLink: buildUrl()
        .qs({ id: changeId, email: newEmail })
        .makeSigned("actions:profile.edit-email.cancel.callback", { expiresIn: "10m" }),
      confirmationLink: buildUrl()
        .qs({ id: changeId, email: newEmail })
        .makeSigned("actions:profile.edit-email.confirm.callback", { expiresIn: "10m" }),
    });

    await mail.send(oldEmailNotification);
    await mail.send(newEmailNotification);
  }
}
