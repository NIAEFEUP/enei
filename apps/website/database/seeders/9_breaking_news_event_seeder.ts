import { Money } from "#lib/payments/money.js";
import Event from "#models/event";
import SpeakerProfile from "#models/speaker_profile";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  async run() {
    const event1 = await Event.create({
      title: "Do Diploma ao Primeiro Emprego: O Que as Empresas Realmente Procuram?",
      description:
        "Este painel tem como objetivo explorar as competências técnicas e interpessoais que um estudante de informática desenvolve ao longo do curso e como estas se refletem na sua preparação para o mercado de trabalho. Contará com 3 painelistas, membros da área de Talent Acquisition da Uphold, Cloudflare e Blip.pt.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 12, minute: 30 }),
      duration: 60,
      type: "painel",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: Money.zero,
    });

    const speakerProfile1 = await SpeakerProfile.create({
      firstName: "João",
      lastName: "Almeida",
      jobTitle: "Psicólogo",
      profilePicture: "/images/speakers/joao-henrique-almeida.jpg",
    });

    const speakerProfile2 = await SpeakerProfile.create({
      firstName: "Luís Miguel",
      lastName: "Cerqueira",
      jobTitle: "Talent Acquisition Program Manager",
      company: "Blip.pt",
      profilePicture: "/images/speakers/luis-cerqueira.jpg",
    });

    const speakerProfile3 = await SpeakerProfile.create({
      firstName: "Ricardo",
      lastName: "Marques",
      jobTitle: "Technical recruiter",
      company: "Uphold",
      profilePicture: "/images/speakers/ricardo-marques.jpg",
    });

    const speakerProfile4 = await SpeakerProfile.create({
      firstName: "Dani",
      lastName: "Rodrigues",
      jobTitle: "University programs recruiter",
      profilePicture: "/images/speakers/dani-rodrigues.jpg",
    });

    await event1
      .related("speakers")
      .attach([speakerProfile1.id, speakerProfile2.id, speakerProfile3.id, speakerProfile4.id]);

    const ruiNascimentoSpeaker = await SpeakerProfile.findOrFail(41);

    ruiNascimentoSpeaker.profilePicture = "/images/speakers/rui-nascimento.png";
    await ruiNascimentoSpeaker.save();

    // Kevel competition
    await Event.create({
      title: "Break the Safe, Win the Prize Power by Kevel",
      description: "Muito em breve...",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 12, minute: 30 }),
      duration: 60,
      type: "competition",
      location: "B001",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 200,
      ticketsTotal: 200,
      price: Money.zero,
    });
  }
}
