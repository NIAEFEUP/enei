import Event from '#models/event'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

async function attach( eventId: number, speakerId: number ) {

    const event = await Event.find(eventId)

    if (!event) {
      console.log('Event not found, skipping...')
      return
    }

    await event.related('speakers').attach([speakerId])
}

export default class extends BaseSeeder {

  async run() {
    await attach(1, 1)
    await attach(2, 2)
    await attach(3, 3)
    await attach(4, 4)
    await attach(4, 5)
    await attach(5, 6)
  }
}
