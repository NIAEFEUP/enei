import LeaderboardService from "#services/leaderboard_service";
import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";

@inject()
export default class LeaderboardController {
  private USER_LIMIT = 50;

  public constructor(private leaderboardService: LeaderboardService) {}

  async index({ inertia }: HttpContext) {
    const leaderboard = await this.leaderboardService
      .getLeaderboardUsers(this.USER_LIMIT)
      .then((users) =>
        users.map((user) => ({
          user: {
            ...user,
            participantProfile: {
              ...user.participantProfile,
              shirtSize: undefined,
              dietaryRestrictions: undefined,
              isVegetarian: undefined,
              isVegan: undefined,
              transports: undefined,
              dateOfBirth: undefined,
              phone: undefined,
              municipality: undefined,
            },
            isAdmin: undefined,
            email: undefined,
            emailVerifiedAt: undefined,
            accounts: undefined,
            orders: undefined,
            isSlugFrozen: undefined,
            resume: undefined,
            checkedInEvents: undefined,
            referrer: undefined,
            referrals: undefined,
            referringPromoter: undefined,
            referrerId: undefined,
            referringPromoterId: undefined,
            eventsRegistered: undefined,
            points: undefined,
            indirectReferrals: undefined,
          },
        })),
      );

    return inertia.render("leaderboard", { leaderboard });
  }
}
