import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Ticket from '#models/ticket'

export default class extends BaseSeeder {
  async run() {
    await Ticket.createMany([
      {
        name: 'Bilhete - Com Alojamento',
        description:
          'Inclui:\n• Pequenos-almoços, almoços e jantares durante o período do evento\n• Acesso a coffee breaks e sessão de cocktails\n• Acesso a workshops, palestras e outros\n• Acesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas) \n• Alojamento em Pavilhão',
        price: 35,
        stock: 150,
      },
      {
        name: 'Bilhete - Sem Alojamento',
        description:
          'Inclui:\n• Pequenos-almoços, almoços e jantares durante o período do evento\n• Acesso a coffee breaks e sessão de cocktails\n• Acesso a workshops, palestras e outros\n• Acesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas)',
        price: 30,
        stock: 50,
      },
    ])
  }
}
