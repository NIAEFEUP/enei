import { ReactNotification } from "./base/react_notification.js";

export default class CompanyRepresentativeSetPasswordNotification extends ReactNotification {
  constructor(private props: { email: string; logoUrl: string; verificationLink: string }) {
    super();
  }

  async prepare() {
    this.message.to(this.props.email).subject("A sua conta no ENEI 2025 foi criada!");

    await this.jsx(
      () => import("#resources/emails/auth/company_representative_set_password"),
      this.props,
    );
  }
}
