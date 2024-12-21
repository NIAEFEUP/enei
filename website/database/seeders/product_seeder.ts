import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
export default class ProductSeeder extends BaseSeeder {
  public async run () {
    await Product.create({
      name: 'Sample Product',
      description: 'This is a sample product used for testing.',
      price: 1.00,
      stock: 50,
      currency: 'USD',
      max_order: 10,
    })
  }
}