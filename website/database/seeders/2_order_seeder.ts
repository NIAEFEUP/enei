import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Order from '#models/order'
export default class OrderSeeder extends BaseSeeder  {
  async run() {
    await Order.createMany([
      {
        requestId: '1',
        userId: 2,
        nif: 123456789,
        address: 'Rua do Ouro, 1000-001 Lisboa',
        status: 'Success',
        total: 1,
      },
    ])

  }
}