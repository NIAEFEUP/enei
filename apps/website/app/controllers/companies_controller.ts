import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import User from "#models/user";
import { UserActivityService } from "#services/user_activity_service";

@inject()
export default class CompaniesController {
  constructor(private userActivityService: UserActivityService) {}

  async likeParticipant({ request, auth, response }: HttpContext) {
    const { participantId } = request.only(["participantId"]);

    // TODO: improve auth to check if user is from a company
    const companyUser = auth.user!;
    const likedParticipant = await User.findOrFail(participantId);

    this.userActivityService.logCompanyLike({
      userId: likedParticipant.id,
      companyId: companyUser.id, // change this to use a company id
      likedByName:
        companyUser.participantProfile.firstName + " " + companyUser.participantProfile.lastName,
    });

    return response.redirect().back();
  }

  async showParticipants({ inertia, params }: HttpContext) {
    const participants = await User.query()
      .preload("participantProfile")
      .whereNotNull("participant_profile_id")
      .orderBy("id");

    return inertia.render("company/participants", {
      allParticipants: participants.map((participant) => ({
        id: participant.id,
        name: `${participant.participantProfile.firstName} ${participant.participantProfile.lastName}`,
        photoUrl: null,
        faculty: participant.participantProfile.university,
        course: participant.participantProfile.course,
        year: participant.participantProfile.curricularYear,
        cvLink: null,
        likedBy: [],
        isLiked: false,
      })),
    });
  }
}
