import Event from '#models/event'
import app from '@adonisjs/core/services/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    if (!app.inDev) {
      console.log('Not running in development environment, skipping...')
      return
    }

    const event = await Event.find(1)

    if (!event) {
      console.log('Event not found, skipping...')
      return
    }

    await event.related('speakers').attach([1])
  }
}
