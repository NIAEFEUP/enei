import mail from "@adonisjs/mail/services/main";
import { buildUrl, staticUrl } from "../url.js";
import type UserForgotPassword from "#events/user_forgot_password";
import ForgotPasswordNotification from "#mails/forgot_password_notification";

export default class SendForgotPasswordEmail {
  async handle(event: UserForgotPassword) {

    const email = event.email;
    const notification = new ForgotPasswordNotification({
      email,
      logoUrl: staticUrl("/images/logo-white.png"),

      verificationLink: buildUrl()
        .qs({ email })
        .makeSigned("actions:auth.forgot-password.callback", { expiresIn: "1h" }),
    });

    await mail.send(notification);
  }
}

