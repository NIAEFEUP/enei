import type { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";
import User from "#models/user";
import Event from "#models/event";
import { UserActivityService } from "#services/user_activity_service";
import Company from "#models/company";

@inject()
export default class CompaniesController {
  constructor(private userActivityService: UserActivityService) {}

  async profile({ params, inertia }: HttpContext) {
    const { name } = params;

    const company = await Company.findByOrFail("name", name);
    await company.load("representativeProfiles");

    const events = await Company.getEvents(company);

    return inertia.render("companyprofile", {
      company,
      events,
    });
  }

  async toggleParticipantLike({ request, auth, response }: HttpContext) {
    const { participantId } = request.only(["participantId"]);

    const companyUser = auth.user!;

    if (!companyUser.representativeProfileId) {
      console.log("User is not a company representative");
      return response.unauthorized("You are not authorized to like participants.");
    }

    await companyUser.load("representativeProfile");

    const likeStatus = await this.userActivityService.toggleCompanyLike(
      participantId,
      companyUser.representativeProfile?.companyId,
      companyUser.id,
    );

    const userLikes = await this.userActivityService.getCompanyLikes(
      participantId,
      companyUser.representativeProfile?.companyId,
    );

    console.log(userLikes);

    const likeNames = await Promise.all(
      userLikes.map(async (user) => {
        if (!user.representativeProfileId) {
          return null;
        }
        await user.load("representativeProfile");
        console.log("user", user.representativeProfile);
        return user.representativeProfile.firstName + " " + user.representativeProfile.lastName;
      }),
    );

    return response.json({
      isLiked: likeStatus,
      likedBy: likeNames,
    });
  }

  async showParticipants({ inertia, auth, response }: HttpContext) {
    const companyUser = auth.getUserOrFail();

    if (!companyUser.representativeProfileId) {
      console.log("User is not a company representative");
      return response.unauthorized("You are not authorized to view participants.");
    }

    await companyUser.load("representativeProfile", (q) => {
      q.preload("company");
    });

    const participants = await User.query()
      .preload("participantProfile")
      .whereNotNull("participant_profile_id")
      .select("users.*")
      .join("participant_profiles", "participant_profiles.id", "users.participant_profile_id")
      .whereNotNull("participant_profiles.purchased_ticket")
      .orderBy("users.id");

    const allParticipants =
      companyUser.representativeProfile.company.sponsor === "bronze"
        ? null
        : await Promise.all(
            participants.map(async (participant) => {
              const likes = await this.userActivityService.getCompanyLikes(
                participant.id,
                companyUser.representativeProfile?.companyId,
              );
              const likedBy = await Promise.all(
                likes.map(async (user) => {
                  if (!user.representativeProfileId) {
                    return null;
                  }
                  await user.load("representativeProfile");
                  return (
                    user.representativeProfile.firstName + " " + user.representativeProfile.lastName
                  );
                }),
              );

              return {
                id: participant.id,
                name: `${participant.participantProfile.firstName} ${participant.participantProfile.lastName}`,
                photoUrl: await participant.resume?.getSignedUrl(),
                faculty: participant.participantProfile.university,
                course: participant.participantProfile.course,
                year: participant.participantProfile.curricularYear,
                cvLink: await participant.resume?.getSignedUrl(),
                likedBy: likedBy.filter((name) => name !== null),
                isLiked: await this.userActivityService.isLiked(participant.id, companyUser.id),
              };
            }),
          );

    const associatedEvent = await Event.query()
      .where("companyId", companyUser.representativeProfile?.companyId)
      .preload("checkedInUsers", (user) => {
        user.preload("participantProfile");
      })
      .first();

    const checkedParticipants = await Promise.all(
      associatedEvent?.checkedInUsers.map(async (participant) => {
        const likes = await this.userActivityService.getCompanyLikes(
          participant.id,
          companyUser.representativeProfile?.companyId,
        );
        const likedBy = await Promise.all(
          likes.map(async (user) => {
            if (!user.representativeProfileId) {
              return null;
            }
            await user.load("representativeProfile");
            return user.representativeProfile.firstName + " " + user.representativeProfile.lastName;
          }),
        );

        return {
          id: participant.id,
          name: `${participant.participantProfile.firstName} ${participant.participantProfile.lastName}`,
          photoUrl: null, // TODO: add photo when available
          faculty: participant.participantProfile.university,
          course: participant.participantProfile.course,
          year: participant.participantProfile.curricularYear,
          cvLink: null, // TODO: add when cv is available
          likedBy: likedBy.filter((name) => name !== null),
          isLiked: await this.userActivityService.isLiked(participant.id, companyUser.id),
        };
      }) || [],
    );

    return inertia.render("company/participants", {
      allParticipants: allParticipants,
      checkedParticipants: checkedParticipants,
      likedParticipants: allParticipants?.filter((p) => p.isLiked),
    });
  }
}
