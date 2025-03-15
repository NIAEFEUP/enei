import { emails, type EmailProps } from '@enei/emails/registry';
import type { DeepPartial, OptionalKeys } from '@enei/utils/types';
import { staticUrl } from '../url.js';
import { BaseMail } from '@adonisjs/mail';
import { render } from '@enei/emails';

type Props = EmailProps<"auth/email-verification">

const defaultProps = {
  logoUrl: staticUrl('/images/logo-white.png'),
} satisfies DeepPartial<Props>;

export default class EmailVerificationNotification extends BaseMail {
  override subject = "Confirma o teu e-mail!";

  #props;
  
  constructor(private props: OptionalKeys<Props, keyof typeof defaultProps>) {
    super()
    this.#props = {...defaultProps, ...props};
  }

  override async prepare() {
    const { html, plainText } = await render(emails.instantiate("auth/email-verification", this.#props));
    
    this.message
      .to(this.props.email)
      .html(html)
      .text(plainText)
  }
}
