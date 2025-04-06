import PromoterProfile from "#models/promoter_profile";
import User from "#models/user";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  async run() {
    const email = "promoter@eneiconf.pt";

    const user = new User();
    user.email = email;
    user.emailVerifiedAt = DateTime.now();

    await user.related("accounts").create({
      id: `credentials:${email}`,
      password: "password",
    });

    const profile = await PromoterProfile.create({});
    await user.related("promoterProfile").associate(profile);
  }
}
