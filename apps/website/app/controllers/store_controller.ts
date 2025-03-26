import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import { StoreService } from "#services/store_service";
import { storeValidator } from "#validators/store";
import { OrderService } from "#services/order_service";
import Product from "#models/product";

@inject()
export default class StoreController {
  constructor(
    private storeService: StoreService,
    private orderService: OrderService,
  ) {}

  async index({ auth, inertia }: HttpContext) {
    const products = await this.storeService.getProducts(auth.user);
    const user = auth.user!;

    // Orders products by price in non-increasing order
    products.sort((a, b) => b.price - a.price);

    return inertia.render("store", { products, user });
  }

  async buy({ auth, response, request, params, session }: HttpContext) {
    const { cost } = await storeValidator.validate({
      productId: params.id,
      ...request.all(),
    });

    const product = await Product.find(params.id);
    if (!(await this.orderService.checkUserMaxOrders(auth.user!, product))) {
      session.flashErrors({ maxOrder: "Já adquiriste a quantia máxima permitida deste produto" });
    }

    if (auth.user!.points < cost) {
      session.flashErrors({ cost: "Não tens pontos suficientes" });
      return response.redirect().back();
    }

    await this.storeService.buyProduct(params.id, auth.user!);

    return response.redirect().back();
  }
}
