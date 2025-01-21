import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AutomaticSubmitMiddleware {
  async handle({request, view }: HttpContext, next: NextFn) {
    const method = request.method()
    // if (method === "POST") return next()
    return next()
    // return view.render('automatic_submit')
  }
}