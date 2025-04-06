import { Money } from "#lib/payments/money.js";
import Order from "#models/order";
import OrderProduct from "#models/order_product";
import Product from "#models/product";
import ProductGroup from "#models/product_group";
import type User from "#models/user";
import type { ProductDetails } from "../../types/product.js";

export class OrderService {
  async checkUserMaxOrders(user: User | null, product: Product | null) {
    if (!user || !product) return false;

    const orderProducts = await OrderProduct.query()
      .join("orders", "order_products.order_id", "orders.id")
      .join("products", "order_products.product_id", "products.id")
      .where("productId", product.id)
      .where("user_id", user.id);

    return orderProducts.length < product.maxOrder;
  }

  static getOrdersForUser(
    user: User,
    currencies: Array<string>,
    states: Array<string> = ["Success", "Pending"],
  ) {
    return OrderProduct.query()
      .join("orders", "order_products.order_id", "orders.id")
      .join("products", "order_products.product_id", "products.id")
      .where("user_id", user.id)
      .whereIn("orders.status", states)
      .whereIn("products.currency", currencies)
      .preload("product")
      .preload("order");
  }

  static async buildProductDetails(
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

  static async createOrder(user: User, product: ProductDetails) {
    // Create the order and associated products
    const order = await Order.create({ userId: user.id, status: "draft", pointsUsed: 0 });

    await OrderProduct.create({
      orderId: order.id,
      productId: product.productId,
      quantity: product.quantity,
    });

    return order;
  }

  async markAsAccepted(productId: number) {
    const orderProduct = await OrderProduct.query().where("product_id", productId).preload("order");
    orderProduct.forEach(async (item) => {
      item.order.status = "Success";
      await item.order.save();
    });
  }
}
