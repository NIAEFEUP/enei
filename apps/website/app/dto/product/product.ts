import type Product from "#models/product";

export class ProductDto {
  constructor(private product: Product) {}

  toJSON() {
    return {
      id: this.product.id,
      createdAt: this.product.createdAt.toISO(),
      updatedAt: this.product.updatedAt.toISO(),
      name: this.product.name,
      description: this.product.description,
      price: this.product.price.toCents(),
      stock: this.product.stock,
      maxOrder: this.product.maxOrder,
      image: this.product.image,
      hidden: this.product.hidden,
      productGroupId: this.product.productGroupId,
      restrictions: this.product.restrictions,
    };
  }
}
