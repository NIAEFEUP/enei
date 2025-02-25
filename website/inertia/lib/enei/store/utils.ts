import type Product from '#models/product'

export function canBuyProduct(product: Product, userPoints: number) {
  return product.stock > 0 && userPoints >= product.price
}