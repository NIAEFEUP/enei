import { logger } from "#lib/adonisjs/logger.js";
import Company from "#models/company";
// import Event from "#models/event";
import ParticipantProfile from "#models/participant_profile";
import RepresentativeProfile from "#models/representative_profile";
// import SpeakerProfile from "#models/speaker_profile";
// import PromoterProfile from '#models/promoter_profile'
import User from "#models/user";
import app from "@adonisjs/core/services/app";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { DateTime } from "luxon";
import Event from "#models/event";

export default class extends BaseSeeder {
  async run() {
    if (!app.inDev) {
      logger().info("Not running in development environment, skipping...");
      return;
    }

    const email = "test@eneiconf.pt";

    const user = new User();
    user.email = email;
    user.emailVerifiedAt = DateTime.now();
    user.slug = "jorge-costa";

    await user.related("accounts").create({
      id: `credentials:${email}`,
      password: "password",
    });

    const profile = await ParticipantProfile.create({
      firstName: "Jorge",
      lastName: "Costa",
      dateOfBirth: DateTime.fromObject({ year: 2003, month: 5, day: 9 }),
      phone: "+351917777777",
      // slug: "jorge-costa",
      university: "pt.up.fe",
      course: "M.EIC",
      curricularYear: "2",
      finishedAt: null,
      municipality: "braga",
      heardAboutEnei: "friends",
      shirtSize: "M",
      isVegetarian: false,
      isVegan: false,
      transports: ["carro"],
      attendedBeforeEditions: [],
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc laoreet eu enim vel semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum eu est vitae ex sodales consequat.",
      github: "https://github.com/JorgeCostaDevPT",
      website: "https://eneiconf.pt",
    });

    // const profile = await PromoterProfile.create({})

    await user.related("participantProfile").associate(profile);

    const company = await Company.create({
      name: "enei",
      logo: "/images/logo-blue.svg",
      sponsor: "gold",
    });

    const user2 = new User();
    user2.email = "empresa@eneiconf.pt";
    user2.emailVerifiedAt = DateTime.now();
    user2.slug = "empresa";
    
    await user2.related("accounts").create({
      id: `credentials:${"empresa@eneiconf.pt"}`,
      password: "password",
    });


    const representativeProfile = await RepresentativeProfile.create({
      firstName: "Empresa",
      lastName: "da ENEI",
      // companyId: 1,
      email: "empresa@eneiconf.pt",
      jobTitle: "CEO",
      ORCIDLink: "https://orcid.org/0000-0000-0000-0000",
    });

    await user2.related("accounts").create({
      id: `credentials:company@eneiconf.pt`,
      password: "password",
    });

    await user2.related("representativeProfile").associate(representativeProfile);

    await representativeProfile.related("company").associate(company);

    const companyEvent = await Event.create({
      title: "Banca - Blip",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 13, minute: 30 }),
      duration: 330,
      type: "painel",
      location: "Corredor B - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
    });

    await companyEvent.related("company").associate(company);
  }
}
