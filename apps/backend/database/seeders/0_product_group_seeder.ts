
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ProductGroup from '#models/product_group'
export default class ProductGroupSeeder extends BaseSeeder {
  override async run() {
    await ProductGroup.createMany([
      {
        name: 'Tickets',
        maxAmountPerGroup: 1,
      },
    ])
  }
}
