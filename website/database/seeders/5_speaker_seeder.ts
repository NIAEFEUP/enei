import SpeakerProfile from '#models/speaker_profile'
import app from '@adonisjs/core/services/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    if (!app.inDev) {
      console.log('Not running in development environment, skipping...')
      return
    }

    await SpeakerProfile.create({
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Software Engineer',
      company: 'Google',
    })
  }
}
