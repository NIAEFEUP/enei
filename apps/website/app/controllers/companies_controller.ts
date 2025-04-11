import Company from "#models/company";
import type { HttpContext } from "@adonisjs/core/http";

export default class CompanyController {
  async profile({ params, inertia }: HttpContext) {
    const { name } = params;

    const company = await Company.findByOrFail("name", name);
    await company.load("representativeProfiles");

    const events = await Company.getEvents(company);

    return inertia.render("companyprofile", {
      company,
      events,
    });
  }
}
