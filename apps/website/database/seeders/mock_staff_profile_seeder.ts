import StaffProfile from "#models/staff_profile";
import User from "#models/user";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
  async run() {
    const user = await User.findOrFail(1);

    const staffProfile = await StaffProfile.create({});

    await user.related("staffProfile").associate(staffProfile);
  }
}
