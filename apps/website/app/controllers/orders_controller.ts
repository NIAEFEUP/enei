import type { HttpContext } from "@adonisjs/core/http";
import Order from "#models/order";
import OrderProduct from "#models/order_product";
import { createMBWayOrderValidator } from "#validators/order";
import { inject } from "@adonisjs/core";
import { PaymentService } from "../services/payment_service.js";

import { OrderService } from "#services/order_service";

@inject()
export default class OrdersController {
  public constructor(
    private paymentService: PaymentService,
    private orderService: OrderService,
  ) {}

  index({ inertia }: HttpContext) {
    return inertia.render("payments");
  }

  async create({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail();
  }

  public async createMBWay({ request, auth, response }: HttpContext) {
    const authUser = auth.getUserOrFail();

    try {
      const { products, nif, address, mobileNumber, name } =
        await request.validateUsing(createMBWayOrderValidator);

      console.log({ products, nif, address, mobileNumber });
      const { productDetails, description, totalAmount } =
        await this.orderService.buildProductDetails(authUser, products);

      // Create the order and associated products
      const order = await Order.create({ userId: authUser.id, status: "draft", pointsUsed: 0 });

      for (const { productId, quantity } of productDetails) {
        await OrderProduct.create({
          orderId: order.id,
          productId: productId,
          quantity,
        });
      }

      this.paymentService.create(
        order,
        totalAmount,
        mobileNumber,
        description,
        authUser.email,
        nif,
        address,
        name,
      );
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "An error occurred while initiating the payment",
      });
    }
  }

  public async show({ inertia, params, auth, response }: HttpContext) {
    const authUser = auth.user;
    if (!authUser) {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }

    const order = await Order.find(params.id);
    if (!order || order.userId !== authUser.id) {
      return response.notFound({ message: "Order not found" });
    }
    return inertia.render("payments/show", { order });
  }
}
