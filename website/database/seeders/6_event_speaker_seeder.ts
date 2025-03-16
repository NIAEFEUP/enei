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
    await attach(6, 7)
    await attach(7, 8)
    await attach(8, 9)
    await attach(9, 10)
    await attach(10, 11)
    await attach(11, 12)
    await attach(12, 13)
    await attach(13, 14)
    await attach(14, 15)
    await attach(15, 16)
    await attach(15, 17)
    await attach(15, 18)
    await attach(15, 19)
    await attach(16, 20)
    await attach(16, 21)
    await attach(17, 22)
    await attach(18, 23)
    await attach(19, 24)
    await attach(20, 25)
    await attach(21, 26)
    await attach(22, 27)
    await attach(23, 28)
    await attach(24, 29)
    await attach(25, 30)
    await attach(26, 31)
    await attach(27, 32)
    await attach(28, 33)
    await attach(29, 34)
    await attach(30, 35)
    await attach(31, 36)
    await attach(32, 37)
    await attach(33, 38)
  }
}
