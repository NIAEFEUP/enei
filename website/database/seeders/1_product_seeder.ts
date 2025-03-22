import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
import { UserTypes } from '../../types/user.js'
export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.create({
      name: 'Bilhete Early Bird - Com Alojamento',
      description:
        'Inclui:<br />• Pequenos-almoços, almoços e jantares durante o período do evento<br />• Acesso a coffee breaks e sessão de cocktails<br />• Acesso a workshops, palestras e outros<br />• Acesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas) <br />• Alojamento em Pavilhão',
      price: 35,
      stock: 100,
      currency: 'EUR',
      maxOrder: 1,
      productGroupId: 1,
      image: '/favicon.svg',
    })
    await Product.create({
      name: 'Bilhete Early Bird - Sem Alojamento',
      description:
        'Inclui:<br />• Pequenos-almoços, almoços e jantares durante o período do evento<br />• Acesso a coffee breaks e sessão de cocktails<br />• Acesso a workshops, palestras e outros<br />• Acesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas)',
      price: 30,
      stock: 50,
      currency: 'EUR',
      maxOrder: 1,
      productGroupId: 1,
      image: '/favicon.svg',
    })
    await Product.create({
      name: 'Rato',
      description: 'I am a mouse',
      price: 30,
      stock: 50,
      currency: 'points',
      maxOrder: 1,
      image: 'hyprxmouse.png',
    })
    await Product.create({
      name: 'Rato',
      description: 'I am a mouse',
      price: 30,
      stock: 0,
      currency: 'points',
      maxOrder: 1,
      image: 'hyprxmouse.png',
    })
    await Product.create({
      name: 'Rato',
      description: 'I am a mouse',
      price: 30,
      stock: 50,
      currency: 'points',
      maxOrder: 1,
      image: 'hyprxmouse.png',
    })
    await Product.create({
      name: 'Participant Rato',
      description: 'I am a mouse',
      price: 30,
      stock: 50,
      currency: 'points',
      maxOrder: 1,
      image: 'hyprxmouse.png',
      restrictions: {
        groups: [UserTypes.PARTICIPANT],
      },
    })
    await Product.create({
      name: 'Promoter Rato',
      description: 'I am a mouse',
      price: 30,
      stock: 50,
      currency: 'points',
      maxOrder: 1,
      image: 'hyprxmouse.png',
      restrictions: {
        groups: [UserTypes.PROMOTER],
      },
    })
  }
}
