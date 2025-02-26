import type { HttpContext } from '@adonisjs/core/http'

export default class EventsController {
  async showEvent({ inertia }: HttpContext) {
    const title = 'Cybersecurity & Password Cracking'
    const description =
      'Uma exploração profunda sobre técnicas de cibersegurança e como os hackers conseguem aceder a passwords. Vamos explorar as técnicas mais comuns e como as podemos prevenir.'
    const date = '2025-03-03'
    const time = '14:00 - 15:30'
    const location = 'B107 - FEUP'
    const speakers = [
      {
        name: 'Dr. Mike Pound',
        role: 'Pesquisador na Universidade de Nottingham, Inglaterra',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY5VZfZYg8fK226K1rD3uGZgKFyA59EkXify-5sPm9Eihp7K11As_fxdM&usqp=CAE&s',
      },
      {
        name: 'Dr. Mike Pound',
        role: 'Pesquisador na Universidade de Nottingham, Inglaterra',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY5VZfZYg8fK226K1rD3uGZgKFyA59EkXify-5sPm9Eihp7K11As_fxdM&usqp=CAE&s',
      },
      {
        name: 'Dr. Mike Pound',
        role: 'Pesquisador na Universidade de Nottingham, Inglaterra aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY5VZfZYg8fK226K1rD3uGZgKFyA59EkXify-5sPm9Eihp7K11As_fxdM&usqp=CAE&s',
      },
      {
        name: 'Dr. Mike Pound',
        role: 'Pesquisador na Universidade de Nottingham, Inglaterra',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY5VZfZYg8fK226K1rD3uGZgKFyA59EkXify-5sPm9Eihp7K11As_fxdM&usqp=CAE&s',
      },
    ]
    const registrationRequirements = ''
    const ticketsRemaining = 10
    const price = 15
    const requiresRegistration = true

    return inertia.render('events', {
      title,
      description,
      date,
      time,
      location,
      speakers,
      registrationRequirements,
      requiresRegistration,
      ticketsRemaining,
      price,
    })
  }
}
