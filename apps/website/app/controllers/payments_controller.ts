import PaymentStatusUpdated from "#events/payment_status_updated";
import Payment from "#models/payment";
import { paymentCallbackValidator } from "#validators/payment";
import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import * as is from "@sindresorhus/is";

@inject()
export default class PaymentsController {
  constructor(
  ) {}

  async callback({ request, response }: HttpContext) {
    const data = await request.validateUsing(paymentCallbackValidator);

    const payment = await Payment.findBy("requestId", data.requestId);
    if (!payment) {
      return response.notFound({ success: false });
    }

    payment.status = data.status;
    payment.reason = is.isNullOrUndefined(data.reason) ? null : data.reason;
    await payment.save();
    
    const [success] = await PaymentStatusUpdated.tryDispatch(payment);
    if (!success) {
      return response.internalServerError({ success: false });
    }

    return response.ok({ success: true });
  }
}
