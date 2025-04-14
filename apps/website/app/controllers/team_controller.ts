import Department from "#models/department";
import User from "#models/user";
import type { HttpContext } from "@adonisjs/core/http";

export default class TeamController {
  async index({ inertia }: HttpContext) {
    const departments = await Department.query().orderBy("orderPriority", "asc");

    const staff = await User.query()
      .preload("staffProfile")
      .preload("participantProfile")
      .whereNotNull("staffProfileId");

    const staffByDepartment = departments.reduce(
      (acc, department) => {
        acc[department.name] = staff.filter(
          (member) => member.staffProfile.departmentId === department.id,
        );
        return acc;
      },
      {} as Record<string, User[]>,
    );

    return inertia.render("team", { departments, staffByDepartment });
  }
}
