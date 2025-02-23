import Product from '#models/product'
import User from '#models/user'
import type { UserTypes } from '../../types/user.js'

export class ProductService {
  async getPointProducts(user: User | undefined) {
    return this.applyRestrictions(await Product.query().where('currency', 'points'), user)
  }

  applyRestrictions(products: Array<Product>, user: User | undefined) {
    if (!user) return products

    return products.filter((product: Product) => this.validGroup(user, product))
  }

  validGroup(user: User, product: Product) {
    const groupRestrictionDefined = product.restrictions && product.restrictions.groups
    if(!groupRestrictionDefined) return true

    console.log("USER GROUPS", user.groups())
    console.log("GROUP RESTRICTION", product.restrictions.groups)

    return groupRestrictionDefined.some((group: UserTypes) => user.groups().includes(group))
  }
}
