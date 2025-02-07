import { BaseSeeder } from '@adonisjs/lucid/seeders'
import OrderProduct from '#models/order_product'
export default class OrderProductSeeder extends BaseSeeder {
  async run() {
    await OrderProduct.createMany([
      {
        orderId: 1,
        productId: 1,
        quantity: 1,
        
      },
    ])
    
  }
}