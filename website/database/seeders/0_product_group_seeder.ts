
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ProductGroup from '#models/product_group'
export default class ProductGroupSeeder extends BaseSeeder {
  public async run() {
    await ProductGroup.createMany([
      {
        name: 'Tickets',
        maxAmountPerGroup: 1,
      },
    ])
  }
}
