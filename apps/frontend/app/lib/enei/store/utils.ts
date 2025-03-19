import type Product from '@enei/backend/app/models/product'

export function canBuyProduct(product: Product, userPoints: number) {
  return product.stock > 0 && userPoints >= product.price
}