import { BaseMail } from '@adonisjs/mail'
import type { DeepPartial, OptionalKeys } from '@enei/utils/types';
import { staticUrl } from '../url.js';
import { emails, type EmailProps } from '@enei/emails/registry';
import { render } from '@enei/emails';

type Props = EmailProps<"auth/email-verification">

const defaultProps = {
  logoUrl: staticUrl('/images/logo-white.png'),
} satisfies DeepPartial<Props>;

export default class ForgotPasswordNotification extends BaseMail {
  override subject = "Repõe a tua palavra-passe!";
  
  #props;
  
  constructor(private props: OptionalKeys<Props, keyof typeof defaultProps>) {
    super()
    this.#props = {...defaultProps, ...props};
  }

  override async prepare() {
    const { html, plainText } = await render(
      emails.instantiate('auth/forgot-password', this.#props)
    );

    this.message
      .to(this.props.email)
      .html(html)
      .text(plainText)
  }
}

