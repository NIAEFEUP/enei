import type { HttpContext } from "@adonisjs/core/http";
import Order from "#models/order";
import OrderProduct from "#models/order_product";
import Product from "#models/product";
import ProductGroup from "#models/product_group";
import { createMBWayOrderValidator } from "#validators/order";
import { inject } from "@adonisjs/core";
import type { PaymentService } from "#services/payment_service";

import { Money } from "#lib/payments/money.js";

@inject()
export default class OrdersController {
  public constructor(private paymentService: PaymentService) {}

  index({ inertia }: HttpContext) {
    return inertia.render("payments");
  }

  public async createMBWay({ request, auth, response }: HttpContext) {
    const authUser = auth.getUserOrFail();

    try {
      const { products, nif, address, mobileNumber, name } =
        await request.validateUsing(createMBWayOrderValidator);

      let totalAmount = Money.fromCents(0);
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

        const successfulOrdersOfGivenProduct = await OrderProduct.query()
          .join("orders", "order_products.order_id", "orders.id")
          .where("order_products.product_id", productId)
          .whereIn("orders.status", ["Success", "Pending"]);

        const successfulOrdersOfGivenProductPerUser = await OrderProduct.query()
          .join("orders", "order_products.order_id", "orders.id")
          .where("orders.user_id", authUser.id)
          .where("order_products.product_id", productId)
          .whereIn("orders.status", ["Success", "Pending"]);

        const stockUsed = successfulOrdersOfGivenProduct.reduce(
          (acc, orderProduct) => acc + orderProduct.quantity,
          0,
        );

        const totalQuantity = successfulOrdersOfGivenProductPerUser.reduce(
          (acc, orderProduct) => acc + orderProduct.quantity,
          0,
        );

        if (product.stock < quantity + stockUsed) {
          return response
            .status(400)
            .json({ message: `Não há mais stock do produto ${product.name}` });
        }

        if (quantity + totalQuantity > product.maxOrder) {
          return response.status(400).json({
            message: `Apenas podes comprar ${product.maxOrder} do produto ${product.name}`,
          });
        }

        const productGroup = await ProductGroup.find(product.productGroupId);
        if (productGroup) {
          const sucessfulOrdersOfGivenGroup = await OrderProduct.query()
            .join("orders", "order_products.order_id", "orders.id")
            .join("products", "order_products.product_id", "products.id")
            .where("orders.user_id", authUser.id)
            .where("products.product_group_id", product.productGroupId)
            .where("orders.status", "Success");

          const totalGroupQuantity = sucessfulOrdersOfGivenGroup.reduce(
            (acc, orderProduct) => acc + orderProduct.quantity,
            0,
          );

          if (totalGroupQuantity + quantity > productGroup.maxAmountPerGroup) {
            return response.status(400).json({
              message: `Apenas podes comprar ${productGroup?.maxAmountPerGroup} produtos do grupo ${productGroup.name}`,
            });
          }
        }
        productDetails.push({ product, quantity });
        totalAmount = totalAmount.add(product.price.multiply(quantity));
        description += `${product.name} x${quantity}, `;
      }

      description = `Payment for order: ${description.slice(0, -2)}`;

      // Create the order and associated products
      const order = await Order.create({ userId: authUser.id, status: "draft" });

      for (const { product, quantity } of productDetails) {
        await OrderProduct.create({
          orderId: order.id,
          productId: product.id,
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
