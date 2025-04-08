import User from "#models/user";
import StaffProfile from "#models/staff_profile";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { DateTime } from "luxon";
import Department from "#models/department";

export default class extends BaseSeeder {
  async run() {
    const staffUser = await User.create({
      email: "staff@eneiconf.pt",
      emailVerifiedAt: DateTime.now(),
    });

    const staffProfile = await StaffProfile.create({
      isAdmin: false,
    });

    const dep = await Department.create({
      id: 99,
      name: "Test Department"
    })

    await staffProfile.related("department").associate(dep);
    
    await staffUser.related("staffProfile").associate(staffProfile);

    await staffUser.related("accounts").create({
      id: "credentials:staff@eneiconf.pt",
      password: "password",
    });
  }
}