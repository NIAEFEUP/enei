import { BaseSeeder } from "@adonisjs/lucid/seeders";
import EventCompany from "#models/event_company";

export default class extends BaseSeeder {
  async run() {
    // ASSOCIATED COMPANIES
    await EventCompany.create({
      eventId: 1,
      companyId: 1,
    });
  }
}
