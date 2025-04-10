import { paymentCallbackValidator } from "#validators/payment";
import type { HttpContext } from "@adonisjs/core/http";

export default class PaymentsController {
  async callback({ request, response }: HttpContext) {
    const data = await request.validateUsing(paymentCallbackValidator);

    
    console.log({ data });
    return response.status(200);
  }
}
