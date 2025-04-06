import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";

@inject()
export default class CompaniesController {
  async showParticipants({ inertia, params }: HttpContext) {
    return inertia.render("company/participants");
  }
}
