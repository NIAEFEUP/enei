import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import User from "#models/user";

@inject()
export default class CompaniesController {
  async showParticipants({ inertia, params }: HttpContext) {
    const participants = await User.query().preload("participantProfile").orderBy("id");
    console.log(participants);

    return inertia.render("company/participants", {
      allParticipants: participants.map((participant) => ({
        id: participant.id,
        name: "Bro",
        photoUrl: null,
        faculty: null,
        course: null,
        year: null,
        cvLink: null,
        likedBy: [],
        isLiked: false,
      })),
    });
  }
}
