import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { StoreService } from '#services/store_service'

@inject()
export default class StoreController {
  constructor(private storeService: StoreService) { }

  async index({ auth, inertia }: HttpContext) {
    const products = await this.storeService.getProducts()
    const user = auth.user!

    return inertia.render('store', { products, user })
  }

  async buy() {

  }
}
