import { Money } from "#lib/payments/money.js";
import Event from "#models/event";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  async run() {
    await Event.create({
      title: "Competição de Programação",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 14, minute: 30 }),
      duration: 240,
      type: "competition",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: Money.fromCents(0),
    });

    await Event.create({
      title: "Rally Tascas",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 21, minute: 30 }),
      duration: 150,
      type: "night",
      isAcceptingRegistrations: true,
      location: "Baixa do Porto",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: Money.fromCents(500),
    });

    await Event.create({
      title: "Game Show",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 20, minute: 30 }),
      duration: 150,
      type: "night",
      location: "AEFEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: Money.fromCents(0),
    });

    await Event.create({
      title: "Visita às Galerias",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 0 }),
      duration: 240,
      type: "night",
      location: "Baixa do Porto",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: Money.fromCents(0),
    });

    await Event.create({
      title: "Competição de Pitches",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 14, minute: 30 }),
      duration: 240,
      type: "competition",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: Money.fromCents(0),
    });

    await Event.create({
      title: "Sessão de Cocktails",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 18, minute: 0 }),
      duration: 90,
      type: "networking",
      location: "Coffee Lounge - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: Money.fromCents(0),
    });

    await Event.create({
      title: "Jantar de Networking powered by Ordem dos Engenheiros da Região Norte (OERN)",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 20, minute: 0 }),
      duration: 180,
      type: "networking",
      location: "TBD",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: Money.fromCents(0),
    });
  }
}
