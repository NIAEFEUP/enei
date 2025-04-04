import { logger } from "#lib/adonisjs/logger.js";
import Company from "#models/company";
import ParticipantProfile from "#models/participant_profile";
import RepresentativeProfile from "#models/representative_profile";
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

    await user.related("accounts").create({
      id: `credentials:${email}`,
      password: "password",
    });

    const profile = await ParticipantProfile.create({
      firstName: "Jorge",
      lastName: "Costa",
      dateOfBirth: DateTime.fromObject({ year: 2003, month: 5, day: 9 }),
      phone: "+351917777777",
      slug: "1234",
      university: "pt.up.fe",
      course: "M.EIC",
      curricularYear: "2",
      finishedAt: null,
      municipality: "Braga",
      heardAboutEnei: "friends",
      shirtSize: "M",
      isVegetarian: false,
      isVegan: false,
      transports: ["a-pe"],
      attendedBeforeEditions: [],
    });

    // const profile = await PromoterProfile.create({})

    await user.related("participantProfile").associate(profile);

    const company = await Company.create({
      name: "ENEI",
      logo: "/images/logo-blue.svg",
    })

    const companyRepresentative = await User.create({
      email: "company@eneiconf.pt",
      emailVerifiedAt: DateTime.now(),
    })

    const companyRepresentativeProfile = await RepresentativeProfile.create({
      firstName: "João",
      lastName: "Silva",
      jobTitle: "CEO",
      ORCIDLink: "https://orcid.org/0000-0002-1825-0097",
    })

    await companyRepresentative.related("representativeProfile").associate(companyRepresentativeProfile)

    await companyRepresentativeProfile.related("company").associate(company)
  }
}
