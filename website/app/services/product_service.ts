import Product from '#models/product'
import User from '#models/user'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { UserTypes } from '../../types/user.js'
import type OrderProduct from '#models/order_product'

export class ProductService {
  productBaseQuery() {
    return Product.query().where('hidden', false)
  }

  async getPointProducts(user: User | undefined = undefined) {
    return this.applyRestrictions(await Product.query().where('currency', 'points'), user)
  }

  async getRealCurrencyProducts(user: User | undefined = undefined) {
    return this.applyRestrictions(await Product.query().where('currency', 'EUR'), user)
  }

  applyRestrictions(products: Array<Product>, user: User | undefined = undefined) {
    if (!user) return products

    return products.filter((product: Product) => this.validGroup(user, product))
  }

  validGroup(user: User, product: Product) {
    const groupRestrictionDefined = product.restrictions && product.restrictions.groups
    if(!groupRestrictionDefined) return true

    return groupRestrictionDefined.some((group: UserTypes) => user.groups().includes(group))
  }

  applyPointProductRestriction(query: ModelQueryBuilderContract<typeof Product | typeof OrderProduct>) {
    return query.where('currency', 'points')
  }
}
