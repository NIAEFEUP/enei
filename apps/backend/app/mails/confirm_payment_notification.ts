import { staticUrl } from '../url.js'
import { BaseMail } from '@adonisjs/mail'
import { emails, type EmailProps } from "@enei/emails/registry";
import { render } from '@enei/emails';
import type { DeepPartial, OptionalKeys } from '@enei/utils/types';

type Props = EmailProps<"payment/confirm-purchase-email">

const defaultProps = {
  logoUrl: staticUrl('/images/logo-white.png'),
} satisfies DeepPartial<Props>;

export default class ConfirmPaymentNotification extends BaseMail {
  override subject = 'O teu pagamento foi concluído com sucesso!'

  #props;

  constructor(props: OptionalKeys<Props, keyof typeof defaultProps>) {
    super()
    this.#props = { ...defaultProps, ...props };
  }

  override async prepare() {
    const { html, plainText } = await render(emails.instantiate("payment/confirm-purchase-email", this.#props));
    
    this.message
      .to(this.#props.email)
      .html(html)
      .text(plainText)
  }
}
