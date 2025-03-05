import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'
import Event from '#models/event'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    if (!app.inDev) {
      console.log('Not running in development environment, skipping...')
      return
    }

    await Event.create({
      title: 'Cybersecurity & Password Cracking',
      description:
        'Uma exploração profunda sobre técnicas de cibersegurança e como os hackers conseguem aceder a passwords. Vamos explorar as técnicas mais comuns e como as podemos prevenir.',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 11, hour: 14, minute: 0 }),
      duration: 90,
      type: 'workshop',
      companyImage:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Critical_TechWorks_Logo.png/800px-Critical_TechWorks_Logo.png?20201230153819',
      location: 'B107 - FEUP',
      registrationRequirements: '',
      requiresRegistration: true,
      ticketsRemaining: 50,
      ticketsTotal: 100,
      price: 0,
    })

    await Event.create({
      title: 'Workshop Computação Quântica',
      description: 'idk',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 11, hour: 16, minute: 0 }),
      duration: 90,
      type: 'activity',
      location: 'ISEP - TBD',
      registrationRequirements: '',
      requiresRegistration: true,
      ticketsRemaining: 40,
      price: 0,
    })
  }
}
