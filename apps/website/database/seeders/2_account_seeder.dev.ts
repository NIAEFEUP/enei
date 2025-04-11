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

    const company = await Company.create({
      name: "enei",
      logo: "/images/logo-blue.svg",
      sponsor: "gold",
    });

    await user.related("participantProfile").associate(profile);

    const user2 = new User();
    user2.email = "empresa@eneiconf.pt";
    user2.emailVerifiedAt = DateTime.now();
    user2.slug = "empresa";

    const representativeProfile = await RepresentativeProfile.create({
      firstName: "Empresa",
      lastName: "da ENEI",
      // companyId: 1,
      email: "empresa@eneiconf.pt",
      jobTitle: "CEO",
      ORCIDLink: "https://orcid.org/0000-0000-0000-0000",
    });

    await user2.related("representativeProfile").associate(representativeProfile);

    await representativeProfile.related("company").associate(company);

    // const mockCompanyEvent = await Event.create({
    //   id: 600,
    //   title: "AI4Cyber",
    //   description:
    //     "Com a crescente digitalização e a sofisticação dos ataques, a Inteligência Artificial surge como solução disruptiva para a cibersegurança. No entanto, é essencial considerar também as vulnerabilidades e novos vetores de ataque que a IA introduz. Esta palestra aborda ambas as perspetivas: o uso da IA na cibersegurança e a segurança da própria IA.",
    //   date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 9, minute: 30 }),
    //   duration: 30,
    //   type: "talk",
    //   location: "Auditório - FEUP",
    //   registrationRequirements: "",
    //   requiresRegistration: false,
    //   price: 0,
    // });

    // const speakerUser = await User.create({
    //   email: "speakeruser@eneiconf.pt",
    //   slug: "speakeruser",
    // });

    // const speakerUserProfile = await SpeakerProfile.create({
    //   id: 500,
    //   firstName: "Nome",
    //   lastName: "Apelido",
    //   jobTitle: "CEO",
    //   company: "enei",
    // });

    // await speakerUser.related("speakerProfile").associate(speakerUserProfile);
    // await mockCompanyEvent.related("speakers").attach([speakerUserProfile.id]);

    const companyRepresentative = await User.create({
      email: "company@eneiconf.pt",
      emailVerifiedAt: DateTime.now(),
    });

    const companyRepresentativeProfile = await RepresentativeProfile.create({
      firstName: "João",
      lastName: "Silva",
      jobTitle: "CEO",
      ORCIDLink: "https://orcid.org/0000-0002-1825-0097",
    });

    await companyRepresentative
      .related("representativeProfile")
      .associate(companyRepresentativeProfile);

    await companyRepresentativeProfile.related("company").associate(company);
  }
}
