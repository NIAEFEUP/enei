import { OrderService } from "#services/order_service";
import { reserveProductValidator } from "#validators/store";
import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";

@inject()
export default class ProductReservationController {
  constructor(private orderService: OrderService) {}

  async collect({ request, response }: HttpContext) {
    const { productId } = await request.validateUsing(reserveProductValidator);

    this.orderService.markAsAccepted(productId);

    return response.redirect().back();
  }
}
