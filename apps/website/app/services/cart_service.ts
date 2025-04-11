import Order from "#models/order";
import type Product from "#models/product";
import type User from "#models/user";
import db from "@adonisjs/lucid/services/db";

export class CartService {
  async getCartForUser(user: User) {
    const cart = await db.transaction(
      async (trx) => {
        const existingCart = await Order.query({ client: trx })
          .withScopes((scopes) => scopes.draft().from(user))
          .first();

        if (existingCart) {
          return existingCart;
        }

        const newCart = await Order.create(
          {
            userId: user.id,
            status: "draft",
          },
          { client: trx },
        );

        return newCart;
      },
      { isolationLevel: "serializable" },
    );

    return cart;
  }

  async setProductInCart(user: User, product: Product, quantity: number) {
    const cart = await this.getCartForUser(user);

    if (quantity <= 0) {
        await cart.related("products").detach([product.id]);
    } else {
        await cart.related("products").attach({
            [product.id]: { quantity },
        });
    }
  }
}
