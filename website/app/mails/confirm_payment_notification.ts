import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'

interface ProductWithQuantity {
  id: number
  name: string
  price: number
  quantity: number
}

export default class ConfirmPaymentNotification extends BaseMail {
  private userEmail: string
  private products: ProductWithQuantity[]
  private total: number
  private orderId: number
  from = env.get('FROM_EMAIL')
  subject = 'Your Payment was completed with Success'

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */

  constructor(userEmail: string, products: ProductWithQuantity[], total: number, orderId: number) {
    super()

    this.userEmail = userEmail
    this.products = products
    this.total = total
    this.orderId = orderId
  }

  async prepare() {
    this.message
      .to(this.userEmail)
      .subject(this.subject)
      .htmlView('emails/confirm_purchase_email_html', {
        userEmail: this.userEmail,
        products: this.products,
        total: this.total,
        orderId: this.orderId,
      })
      .textView('emails/confirm_purchase_email_text', {
        userEmail: this.userEmail,
        products: this.products,
        total: this.total,
        orderId: this.orderId,
      })
  }
}
