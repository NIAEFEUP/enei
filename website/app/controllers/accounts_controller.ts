import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      response.redirect('/')
    } catch (error) {
      return response.status(422).send({
        errors: {
          email: 'Email ou palavra-passe inválidos',
        },
      })
    }
  }
}
