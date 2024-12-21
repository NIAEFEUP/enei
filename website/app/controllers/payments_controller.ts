import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentsController {
  index({ inertia }: HttpContext) {
    return inertia.render('payments/index')
  }
}
