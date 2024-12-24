import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.create({
      name: 'Bilhete - Com Alojamento',
      description:
        'Inclui:<br />• Pequenos-almoços, almoços e jantares durante o período do evento<br />• Acesso a coffee breaks e sessão de cocktails<br />• Acesso a workshops, palestras e outros<br />• Acesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas) <br />• Alojamento em Pavilhão',
      price: 35,
      stock: 150,
      currency: 'EUR',
      max_order: 1,
    })
    await Product.create({
      name: 'Bilhete - Sem Alojamento',
      description:
        'Inclui:<br />• Pequenos-almoços, almoços e jantares durante o período do evento<br />• Acesso a coffee breaks e sessão de cocktails<br />• Acesso a workshops, palestras e outros<br />• Acesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas)',
      price: 30,
      stock: 50,
      currency: 'EUR',
      max_order: 1,
    })
  }
}
