import SpeakerProfile from '#models/speaker_profile'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {

    await SpeakerProfile.create({
      firstName: 'Fernando',
      lastName: 'Maia',
      jobTitle: 'Engenheiro Óptico',
      profilePicture:
        '/images/speakers/fernando-maia.jpg',
      company: 'iLoF',
    })

    await SpeakerProfile.create({
      firstName: 'Joaquim',
      lastName: 'Jorge',
      jobTitle: 'Professor Catedrático',
      profilePicture:
        '/images/speakers/joaquim-jorge.jpg',
      company: 'Instituto Superior Técnico',
    })

    await SpeakerProfile.create({
      firstName: 'Leandro',
      lastName: 'Sousa',
      jobTitle: 'Engenheiro Informático',
      profilePicture:
        '/images/speakers/leandro-sousa.jpg',
      company: 'Noesis',
    })

    await SpeakerProfile.create({
      firstName: 'Sílvia',
      lastName: 'Tavares',
      jobTitle: 'Data Engineer',
      profilePicture:
        '/images/speakers/silvia-tavares.jpg',
      company: 'Permira',
    })

    await SpeakerProfile.create({
      firstName: 'Rojan',
      lastName: 'Aslani',
      jobTitle: 'Data Scientist',
      profilePicture:
        '/images/speakers/rojan-aslani.jpg',
      company: 'MC Sonae',
    })

    await SpeakerProfile.create({
      firstName: 'Charalampos',
      lastName: 'Patrikakis',
      jobTitle: 'IEEE Distinguished Contributor',
      profilePicture:
        '/images/speakers/charalampos-patrikakis.jpg',
      company: 'IEEE',
    })
  }
}
