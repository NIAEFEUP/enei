import { BasePolicy } from "@adonisjs/bouncer";

export default class OrderPolicy extends BasePolicy {
  async productInStock(stock: number, quantity: number, stockUsed: number) {
    return stock - stockUsed >= quantity;
  }
}
