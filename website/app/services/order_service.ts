import OrderProduct from "#models/order_product";
import type Product from "#models/product";
import type User from "#models/user";

export class OrderService {
    async checkUserMaxOrders(user: User | null, product: Product | null) {
      if(!user || !product) return false

      const orderProducts = await OrderProduct.query()
        .join('orders', 'order_products.order_id', 'orders.id')
        .join('products', 'order_products.product_id', 'products.id')
        .where('productId', product.id)
        .where('user_id', user.id)

      return orderProducts.length < product.max_order
    }

    getOrdersForUser(user: User, states: Array<string> = ['Success', 'Pending']) {
      return OrderProduct.query()
        .join('orders', 'order_products.order_id', 'orders.id')
        .join('products', 'order_products.product_id', 'products.id')
        .where('user_id', user.id)
        .whereIn('orders.status', states)
    }
}
