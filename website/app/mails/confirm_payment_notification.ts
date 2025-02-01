import env from '#start/env'
import { ReactNotification } from './base/react_notification.js'
import type { ProductWithQuantity, MailProps } from '#resources/emails/payment/confirm_purchase_email'

export default class ConfirmPaymentNotification extends ReactNotification {
  private userEmail: string
  private products: ProductWithQuantity[]
  private total: number
  private orderId: number
  from = env.get('FROM_EMAIL')
  subject = 'Your Payment was completed with Success'

  constructor(userEmail: string, products: ProductWithQuantity[], total: number, orderId: number) {
    super()
    this.userEmail = userEmail
    this.products = products
    this.total = total
    this.orderId = orderId
  }

  get props(): MailProps {
    return {
      logoUrl: 'https://eneiconf.pt/images/logo-white.svg',
      userEmail: this.userEmail,
      products: this.products,
      total: this.total,
      orderId: this.orderId,
    }
  }

  async prepare() {
    this.message.to(this.userEmail)
    await this.jsx(() =>  import('#resources/emails/payment/confirm_purchase_email'), this.props)
  }
}
