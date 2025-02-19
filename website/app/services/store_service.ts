import Product from '#models/product'

export class StoreService {
  async getProducts() {
    return await Product.all()//findBy("currency", "points")
  }
}
