import type { HttpContext } from '@adonisjs/core/http'

export default class GithubAccountsController {
  async init({ ally }: HttpContext) {
    ally.use('github').redirect()
  }

  async callback({ ally }: HttpContext) {
    console.log('callback')
  }
}
