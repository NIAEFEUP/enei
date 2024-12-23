import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentsController {
  index({ inertia }: HttpContext) {
    return inertia.render('payments/index')
  }

  public async process({ request, response }: HttpContext) {
    const { phoneNumber, paymentMethod, billingInfo } = request.all()

    console.log('Payment method:', paymentMethod)
    console.log('Phone number:', phoneNumber)
    console.log('Billing info:', billingInfo)

    return response.ok({ success: true, message: 'Payment processed successfully!' })
  }
}
