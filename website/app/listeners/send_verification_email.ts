import UserCreated from "#events/user_created";
import EmailVerificationNotification from "#mails/email_verification_notification";
import mail from "@adonisjs/mail/services/main";
import { buildUrl, staticUrl } from "../url.js";

export default class SendVerificationEmail {
  async handle(event: UserCreated) {
    // Don't send the verification e-mail if the user has already verified it
    if (event.user.emailVerifiedAt) return;

    const email = event.user.email;
    const notification = new EmailVerificationNotification({
      email,
      logoUrl: staticUrl("/images/logo-white.png"),

      verificationLink: buildUrl()
        .qs({ email })
        .makeSigned("actions:auth.verify.callback", { expiresIn: "1h" }),
    });

    await mail.send(notification);
  }
}
