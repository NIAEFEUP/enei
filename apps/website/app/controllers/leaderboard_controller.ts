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
        users.map(
          (user) => user.serialize({
              fields: [
                "id",
                "slug",
              ],
              relations: {
                participantProfile: {
                  fields: [
                    "firstName",
                    "lastName",
                    "university",
                    "course",
                    "curricularYear",
                    "attendedBeforeEditions",
                    "github",
                    "linkedin",
                    "website",
                  ]
                }
              }
            })
          )
        )
    return inertia.render("leaderboard", { leaderboard });
  }
}
