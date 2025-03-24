import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class AutomaticSubmitMiddleware {
  async handle({ request, response, view }: HttpContext, next: NextFn) {
    const method = request.method();
    if (method === "POST") return next();

    // Clever hack by virk to render Edge.js templates in middlewares
    return response.status(200).send(await view.render("automatic_submit"));
  }
}
