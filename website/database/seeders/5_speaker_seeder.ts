import SpeakerProfile from '#models/speaker_profile'
import app from '@adonisjs/core/services/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // if (!app.inDev) {
    //   console.log('Not running in development environment, skipping...')
    //   return
    // }

    await SpeakerProfile.create({
      firstName: 'Patrícia',
      lastName: 'Duarte Mateus',
      jobTitle: 'Software Engineer',
      profilePicture:
        'https://cdn-images.dzcdn.net/images/artist/f99f8f4d32fb5c72add009ae44729981/1900x1900-000000-80-0-0.jpg',
      company: 'Google',
    })
  }
}
