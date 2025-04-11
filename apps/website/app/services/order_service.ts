import { Money } from "#lib/payments/money.js";
import Order, { type OrderStatus } from "#models/order";
import OrderProduct from "#models/order_product";
import Product from "#models/product";
import ProductGroup from "#models/product_group";
import type User from "#models/user";
import type { TransactionClientContract } from "@adonisjs/lucid/types/database";
import type { ProductDetails } from "../../types/product.js";
import { inject } from "@adonisjs/core";

@inject()
export class OrderService {
  constructor() {}

  // async createOrderFromCart(user: User) {
  //   const cart = await this.cartService.getCartForUser(user);

  //   if (await cart.isEmpty()) {
  //     return {
  //       success: false,
  //       reason: "cart-empty",
  //     } as const;
  //   }

  //   cart.status = "processing";
  //   await cart.save();

  //   const products = await cart.$relations.products();

  //   const [totalPoints, _totalMoney] = products.reduce(
  //     ([prevPoints, prevMoney], product) => [prevPoints + product.points * product.$extras.quantity, prevMoney.add(product.price)],
  //     [0, Money.zero]
  //   );

  //   cart.pointsUsed = totalPoints;
  //   await cart.save();

  //   const validationResult = this.validate(cart);
  //   if (!validationResult.success) {

  //     return
  //   }

  // if (totalMoney.isGreaterThan(Money.zero)) {
  //   // // FIXME
  //   // const payment = await PaymentService.create(
  //   //   cart,
  //   //   totalMoney,
  //   //   "",
  //   //   "Compra de itens",
  //   //   user.email,
  //   //   null,
  //   //   null,
  //   //   user.name,
  //   // );

  //   cart.status = "pending-payment";
  //   await cart.save();
  //   await cart.related("payments").save(payment);

  //   return;
  // }

  //}

  async checkUserMaxOrders(user: User | null, product: Product | null) {
    if (!user || !product) return false;

    const orderProducts = await OrderProduct.query()
      .join("orders", "order_products.order_id", "orders.id")
      .join("products", "order_products.product_id", "products.id")
      .where("productId", product.id)
      .where("user_id", user.id);

    return orderProducts.length < product.maxOrder;
  }

  static getPointOrdersForUser(user: User) {
    return OrderProduct.query()
      .join("orders", "order_products.order_id", "orders.id")
      .join("products", "order_products.product_id", "products.id")
      .where("user_id", user.id)
      .whereNotNull("products.points")
      .whereNull("products.price")
      .preload("product")
      .preload("order");
  }

  async buildProductDetails(
    user: User,
    products: Array<ProductDetails>,
  ): Promise<{
    productDetails: Array<ProductDetails>;
    description: string;
    totalAmount: Money;
  }> {
    const productDetails = [];

    let totalAmount = Money.fromCents(0);
    let description = "";

    for (const productItem of products) {
      const { productId, quantity } = productItem;
      const product = await Product.findOrFail(productId);

      const successfulOrdersOfGivenProduct = await OrderProduct.query()
        .join("orders", "order_products.order_id", "orders.id")
        .where("order_products.product_id", productId)
        .whereNotIn("orders.status", ["draft", "canceled"]);

      const successfulOrdersOfGivenProductPerUser = await OrderProduct.query()
        .join("orders", "order_products.order_id", "orders.id")
        .where("orders.user_id", user.id)
        .where("order_products.product_id", productId)
        .whereNotIn("orders.status", ["draft", "canceled"]);

      const stockUsed = successfulOrdersOfGivenProduct.reduce(
        (acc, orderProduct) => acc + orderProduct.quantity,
        0,
      );

      const totalQuantity = successfulOrdersOfGivenProductPerUser.reduce(
        (acc, orderProduct) => acc + orderProduct.quantity,
        0,
      );

      if (product.stock < quantity + stockUsed || quantity + totalQuantity > product.maxOrder) {
        return {
          productDetails: [],
          description: "",
          totalAmount: Money.fromCents(0),
        };
      }

      const productGroup = await ProductGroup.find(product.productGroupId);
      if (productGroup) {
        const sucessfulOrdersOfGivenGroup = await OrderProduct.query()
          .join("orders", "order_products.order_id", "orders.id")
          .join("products", "order_products.product_id", "products.id")
          .where("orders.user_id", user.id)
          .where("products.product_group_id", product.productGroupId)
          .whereIn("orders.status", ["delivery", "pending-delivery"]);

        const totalGroupQuantity = sucessfulOrdersOfGivenGroup.reduce(
          (acc, orderProduct) => acc + orderProduct.quantity,
          0,
        );

        if (totalGroupQuantity + quantity > (productGroup.maxAmountPerGroup ?? Infinity)) {
          return {
            productDetails: [],
            description: "",
            totalAmount: Money.fromCents(0),
          };
        }
      }

      productDetails.push({ productId: product.id, quantity });
      totalAmount = totalAmount.add(product.price.multiply(quantity));
      description += `${product.name} x${quantity}, `;
    }

    description = `Payment for order: ${description.slice(0, -2)}`;

    return { productDetails, description, totalAmount };
  }

  static async createOrder(
    user: User,
    product: ProductDetails,
    pointsUsed: number = 0,
    status: OrderStatus = "draft",
    trx?: TransactionClientContract,
  ) {
    // Create the order and associated products
    const order = await Order.create({ userId: user.id, status, pointsUsed }, { client: trx });

    await OrderProduct.create(
      {
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
      },
      { client: trx },
    );

    return order;
  }

  async markAsAccepted(productId: number) {
    const orderProduct = await OrderProduct.query().where("product_id", productId).preload("order");
    orderProduct.forEach(async (item: OrderProduct) => {
      item.order.status = "delivered";
      await item.order.save();
    });
  }
}
