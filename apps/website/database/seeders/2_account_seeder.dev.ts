import { logger } from "#lib/adonisjs/logger.js";
import Company from "#models/company";
import ParticipantProfile from "#models/participant_profile";
import SpeakerProfile from "#models/speaker_profile";
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

    const emailParticipant = "test@eneiconf.pt";

    const user1 = new User();
    user1.email = emailParticipant;
    user1.emailVerifiedAt = DateTime.now();
    user1.slug = "jorge-costa";

    await user1.related("accounts").create({
      id: `credentials:${emailParticipant}`,
      password: "password",
    });

    const emailSpeaker = "speaker@eneiconf.pt";

    const user2 = new User();
    user2.email = emailSpeaker;
    user2.emailVerifiedAt = DateTime.now();
    user2.slug = "miguel-silva";

    await user2.related("accounts").create({
      id: `credentials:${emailSpeaker}`,
      password: "password",
    });

    const emailCompany = "company@eneiconf.pt";

    const user3 = new User();
    user3.email = emailCompany;
    user3.emailVerifiedAt = DateTime.now();
    user3.slug = "google";

    await user3.related("accounts").create({
      id: `credentials:${emailCompany}`,
      password: "password",
    });

    const profile = await ParticipantProfile.create({
      firstName: "Jorge",
      lastName: "Costa",
      dateOfBirth: DateTime.fromObject({ year: 2003, month: 5, day: 9 }),
      phone: "+351917777777",
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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc laoreet eu enim vel semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum eu est vitae ex sodales consequat. In hac habitasse platea dictumst. Donec sed sodales arcu. Ut ultrices risus ipsum, sed iaculis libero auctor quis. Praesent eu fermentum enim, in egestas eros. Curabitur ac eros ut erat varius pretium eu eu turpis. Pellentesque tristique neque mauris. Morbi ultricies et justo sed suscipit. Praesent maximus arcu eu urna consequat consectetur. Nam pellentesque iaculis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin massa orci, sed posuere mi imperdiet non.",
      github: "https://github.com/JorgeCostaDevPT",
      website: "https://eneiconf.pt",
    });

    // const profile = await PromoterProfile.create({})

    await user1.related("participantProfile").associate(profile);

    const profile3 = await Company.create({
      name: "Google",
      logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png",
    });

    const profile2 = await SpeakerProfile.create({
      firstName: "Miguel",
      lastName: "Silva",
      jobTitle: "Software Engineer",
      speakerRole: "keynote_speaker",
      ORCIDLink: "https://orcid.org/0000-0002-1825-0097",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc laoreet eu enim vel semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum eu est vitae ex sodales consequat. In hac habitasse platea dictumst. Donec sed sodales arcu. Ut ultrices risus ipsum, sed iaculis libero auctor quis. Praesent eu fermentum enim, in egestas eros. Curabitur ac eros ut erat varius pretium eu eu turpis. Pellentesque tristique neque mauris. Morbi ultricies et justo sed suscipit. Praesent maximus arcu eu urna consequat consectetur. Nam pellentesque iaculis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin massa orci, sed posuere mi imperdiet non.",
    });

    await user3.related("companyProfile").associate(profile3);
    await user2.related("speakerProfile").associate(profile2);

    await profile2.related("company").associate(profile3);
  }
}
