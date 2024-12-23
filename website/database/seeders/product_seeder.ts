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
    await Product.create({
      name: 'Another Sample Product',
      description: 'This is another sample product used for testing.',
      price: 2.00,
      stock: 100,
      currency: 'USD',
      max_order: 20,
    })
    await Product.create({
      name: 'Yet Another Sample Product',
      description: 'This is yet another sample product used for testing.',
      price: 3.00,
      stock: 150,
      currency: 'USD',
      max_order: 30,
    })
    await Product.create({
      name: 'One More Sample Product',
      description: 'This is one more sample product used for testing.',
      price: 4.00,
      stock: 200,
      currency: 'USD',
      max_order: 40,
    })
  }
}