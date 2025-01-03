import type { HttpContext } from '@adonisjs/core/http'

export default class GoogleAccountsController {
  async init({ ally }: HttpContext) {
    ally.use('google').redirect()
  }

  async callback({ ally }: HttpContext) {
    console.log('callback')
  }
}
