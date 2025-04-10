import mail from "@adonisjs/mail/services/main";
import { buildUrl, staticUrl } from "../url.js";
import type CompanyRepresentativeSetPassword from "#events/company_representative_set_password";
import CompanyRepresentativeSetPasswordNotification from "#mails/company_representative_set_password_notification";

export default class CompanyRepresentativeSetPasswordEmail {
  async handle(event: CompanyRepresentativeSetPassword) {
    const notification = new CompanyRepresentativeSetPasswordNotification({
      email: event.email,
      logoUrl: staticUrl("/images/logo-white.png"),

      verificationLink: buildUrl()
        .qs({ email: event.email })
        .makeSigned("pages:auth.forgot-password.callback", { expiresIn: "7d" }),
    });

    await mail.send(notification);
  }
}
