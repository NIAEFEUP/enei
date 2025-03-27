import Product from "#models/product";
import User from "#models/user";
import type { UserTypes } from "../../types/user.js";

export class ProductService {
  productBaseQuery() {
    return Product.query().where("hidden", false);
  }

  async getPointProducts(user: User | undefined) {
    return this.applyRestrictions(await this.productBaseQuery().where("currency", "points"), user);
  }

  async getRealCurrencyProducts() {
    return this.applyRestrictions(await this.productBaseQuery().where("currency", "EUR"));
  }

  applyRestrictions(products: Array<Product>, user: User | undefined = undefined) {
    if (!user) return products.filter((product) => product.restrictions === null);

    return products.filter((product: Product) => this.validGroup(user, product));
  }

  validGroup(user: User, product: Product) {
    const groupRestrictionDefined = product.restrictions && product.restrictions.groups;
    if (!groupRestrictionDefined) return true;

    // console.log("USER GROUPS", user.groups());
    // console.log("GROUP RESTRICTION", product.restrictions.groups);

    return groupRestrictionDefined.some((group: UserTypes) => user.groups().includes(group));
  }
}
