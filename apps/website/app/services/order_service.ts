import Order from "#models/order";
import OrderProduct from "#models/order_product";
import type Product from "#models/product";
import ProductGroup from "#models/product_group";
import type User from "#models/user";

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

  async markAsAccepted(productId: number) {
    const orderProduct = await OrderProduct.query().where("product_id", productId).preload("order");
    orderProduct.forEach(async (item) => {
      item.order.status = "Success";
      await item.order.save();
    });
  }

  async checkProductStock(product: Product, quantity: number) {
    const successfulOrdersOfGivenProduct = await OrderProduct.query()
      .join("orders", "order_products.order_id", "orders.id")
      .where("order_products.product_id", product.id)
      .whereIn("orders.status", ["Success", "Pending"]);

    const stockUsed = successfulOrdersOfGivenProduct.reduce(
      (acc, orderProduct) => acc + orderProduct.quantity,
      0,
    );

    return product.stock >= quantity + stockUsed;
  }

  async checkUserMaxGroupOrders(user: User, product: Product, quantity: number) {
    const productGroup = await ProductGroup.find(product.productGroupId);
    if (!productGroup) return true;
    const sucessfulOrdersOfGivenGroup = await OrderProduct.query()
      .join("orders", "order_products.order_id", "orders.id")
      .join("products", "order_products.product_id", "products.id")
      .where("orders.user_id", user.id)
      .where("products.product_group_id", product.productGroupId)
      .where("orders.status", "Success");

    const totalGroupQuantity = sucessfulOrdersOfGivenGroup.reduce(
      (acc, orderProduct) => acc + orderProduct.quantity,
      0,
    );

    return totalGroupQuantity + quantity <= productGroup.maxAmountPerGroup;
  }

  async createOrder(userId: number, name: string, nif: number, address: string) {
    return await Order.create({ userId, name, nif, address });
  }
}
