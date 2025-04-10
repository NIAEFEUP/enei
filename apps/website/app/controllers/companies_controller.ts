import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import User from "#models/user";
import { UserActivityService } from "#services/user_activity_service";

@inject()
export default class CompaniesController {
  constructor(private userActivityService: UserActivityService) { }

  async toggleParticipantLike({ request, auth, response }: HttpContext) {
    const { participantId } = request.only(["participantId"]);

    const companyUser = auth.user!;

    // Return unauthorized if the user is not a company representative
    if (!companyUser.representativeProfileId) {
      console.log("User is not a company representative");
      return response.unauthorized("You are not authorized to like participants.");
    }

    await companyUser.load("representativeProfile");

    const likeStatus = this.userActivityService.toggleCompanyLike({
      userId: participantId,
      companyId: companyUser.representativeProfile?.companyId,
      likedById: companyUser.id,
    });

    return response.json({
      isLiked: likeStatus,
    });
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
        photoUrl: null, // TODO: add photo when available
        faculty: participant.participantProfile.university,
        course: participant.participantProfile.course,
        year: participant.participantProfile.curricularYear,
        cvLink: null, // TODO: add when cv is available
        likedBy: [],
        isLiked: false, // TODO: hardcoded for now
      })),
    });
  }
}
