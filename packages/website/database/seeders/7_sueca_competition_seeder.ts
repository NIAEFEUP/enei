import Event from "#models/event";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  async run() {
    await Event.create({
      title: "Torneio de Bots de Sueca",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 12, minute: 30 }),
      duration: 60,
      type: "competition",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: 0,
    });
  }
}
