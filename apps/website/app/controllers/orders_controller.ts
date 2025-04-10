import type { HttpContext } from "@adonisjs/core/http";
import env from "#start/env";
import axios from "axios";
import Order from "#models/order";
import OrderProduct from "#models/order_product";
import Product from "#models/product";
import ProductGroup from "#models/product_group";
import { createMBWayOrderValidator } from "#validators/order";
import UpdateOrderStatus from "../jobs/update_order_status.js";
import { OrderService } from "#services/order_service";
import { inject } from "@adonisjs/core";

@inject()
export default class OrdersController {
  constructor(private orderService: OrderService) {}
  index({ inertia }: HttpContext) {
    return inertia.render("payments");
  }

  public async createMBWay({ request, auth, response }: HttpContext) {
    const authUser = auth.user;
    if (!authUser) {
      return response.status(401).json({ message: "Não autorizado" });
    }
    try {
      // Validate input format
      await request.validateUsing(createMBWayOrderValidator);

      const { products, name, nif, address, mobileNumber } = request.all();

      let totalAmount = 0;
      let description = "";

      const productDetails = [];

      for (const productItem of products) {
        const { productId, quantity } = productItem;
        const product = await Product.find(productId);

        if (!product) {
          return response
            .status(404)
            .json({ message: `Produto com id ${productId} não foi encontrado` });
        }

        if (!(await this.orderService.checkProductStock(product, quantity))) {
          return response
            .status(400)
            .json({ message: `Não há mais stock do produto ${product.name}` });
        }

        if (!(await this.orderService.checkUserMaxOrders(auth.user, product))) {
          return response.status(400).json({
            message: `Apenas podes comprar ${product.maxOrder} do produto ${product.name}`,
          });
        }

        if (!(await this.orderService.checkUserMaxGroupOrders(auth.user, product, quantity))) {
          const productGroup = await ProductGroup.find(product.productGroupId);
          return response.status(400).json({
            message: `Apenas podes comprar ${productGroup?.maxAmountPerGroup} produtos do grupo ${productGroup?.name}`,
          });
        }
        productDetails.push({ product, quantity });
        totalAmount += product.price * quantity;
        description += `${product.name} x${quantity}, `;
      }

      description = `Payment for order: ${description.slice(0, -2)}`;

      // Create the order and associated products
      const order = await this.orderService.createOrder(authUser.id, name, nif, address);

      for (const { product, quantity } of productDetails) {
        await OrderProduct.create({
          orderId: order.id,
          productId: product.id,
          quantity,
        });
      }

      // Prepare payment data

      const data = {
        mbWayKey: env.get("IFTHENPAY_MBWAY_KEY"),
        orderId: order.id,
        amount: totalAmount.toFixed(2),
        mobileNumber,
        description,
      };

      // Call payment API

      const apiResponse = await axios.post("https://api.ifthenpay.com/spg/payment/mbway", data);

      if (apiResponse.status === 200) {
        const responseData = apiResponse.data;
        order.requestId = responseData.RequestId;
        order.status = "Pending";
        order.total = totalAmount;
        await order.save();

        // Dispatch background job to update order status

        await UpdateOrderStatus.dispatch(
          { requestId: order.requestId, email: auth.user.email },
          { delay: 10000 },
        ).catch((error) => {
          console.error("Error dispatching job", error);
        });

        return response.status(200).json({
          order,
          message: "Payment initiated successfully",
        });
      } else {
        return response.status(500).json({ message: "Failed to initiate payment" });
      }
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
