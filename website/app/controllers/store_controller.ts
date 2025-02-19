import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { StoreService } from '#services/store_service'
import { storeValidator } from '#validators/store'

@inject()
export default class StoreController {
  constructor(private storeService: StoreService) { }

  async index({ auth, inertia }: HttpContext) {
    const products = await this.storeService.getProducts()
    const user = auth.user!

    return inertia.render('store', { products, user })
  }

  async buy({ auth, response, request, params, session }: HttpContext) {
    const { cost } = await storeValidator.validate({
      productId: params.id,
      ...request.all()
    })

    if(auth.user!.points < cost) {
      session.flashErrors({ cost: 'Não tens pontos suficientes' })
      return response.redirect().back()
    }

    // 3. Create an order and associate the product
    await this.storeService.buyProduct(params.id, auth.user!)

    return response.redirect().back()
  }
}
