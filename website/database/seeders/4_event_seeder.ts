import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Event from '#models/event'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {

    await Event.create({
      title: 'Um cheirinho de Computação Quântica',
      description:
        'Neste workshop, vamos direto ao ponto: uma introdução leve à teoria e muita prática para tudo fazer sentido. Queremos mostrar que computação quântica não é um bicho de sete cabeças - qualquer um pode começar a explorar este universo incrível!',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 10, minute: 0 }),
      duration: 120,
      type: 'workshop',
      location: 'TBD - ISEP',
      registrationRequirements: '',
      requiresRegistration: true,
      ticketsRemaining: 50,
      ticketsTotal: 50,
      price: 0,
    })

    await Event.create({
      title: 'Abordagens e Desafios da Realidade Virtual e Aumentada na Saúde e Reabilitação',
      description: 'A Realidade Aumentada (AR) e a Realidade Virtual (VR) estão a transformar a medicina, melhorando a visualização de imagens, o planeamento cirúrgico e a reabilitação. No entanto, a integração destas tecnologias ainda enfrenta desafios, como a adaptação aos fluxos de trabalho tradicionais e a necessidade de uma interação mais intuitiva.',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 14, minute: 0 }),
      duration: 45,
      type: 'other',
      location: 'Auditório - FEUP',
      registrationRequirements: '',
      requiresRegistration: true,
      ticketsRemaining: 50,
      price: 0,
    })

    await Event.create({
      title: 'Kubernetes in Action: Mastering Container Orchestration',
      description: 'Kubernetes é a principal plataforma de orquestração de containers, facilitando a implementação, escalabilidade e gestão de aplicações. Neste workshop, serão abordados conceitos fundamentais, implementação, estratégias de escalabilidade e gestão de configurações. Os participantes irão desenvolver uma base sólida em Kubernetes e compreender o seu papel no desenvolvimento em Cloud.',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 10, minute: 0 }),
      duration: 120,
      type: 'workshop',
      location: 'TBD - FEUP',
      registrationRequirements: '',
      requiresRegistration: true,
      ticketsRemaining: 50,
      price: 0,
    })

    await Event.create({
      title: 'Deep Learning for Human Pose Estimation: From Theory to Application',
      description: 'Este workshop aborda os fundamentos da estimativa de pose humana, uma tecnologia essencial em saúde, desporto, animação e interação humano-computador. Através de exercícios práticos e exemplos reais, vais aprender a detetar e analisar o movimento humano com aprendizagem profunda — não é necessária experiência prévia, apenas curiosidade!',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 16, minute: 30 }),
      duration: 120,
      type: 'workshop',
      location: 'TBD - FEUP',
      registrationRequirements: '',
      requiresRegistration: true,
      ticketsRemaining: 50,
      price: 0,
    })

    await Event.create({
      title: 'The programmer who didn’t know how to code. - Powered by IEEE Portugal',
      description: 'AI is transforming every field, with an even greater impact on Electrical and Electronics Engineering. Combined with IoT/WoT, cloud computing, and networking, these changes are profound. One major shift is in code development, where AI is not just automating code generation but changing programming itself. This talk explores the future of programming, showcasing tools and platforms shaping this transformation',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 15, minute: 15 }),
      duration: 45,
      type: 'other',
      location: 'Auditório - FEUP',
      registrationRequirements: '',
      requiresRegistration: true,
      ticketsRemaining: 50,
      price: 0,
    })
  }
}
