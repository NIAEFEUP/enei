import User from "#models/user";

export default class LeaderboardService {
  async getLeaderboardUsers(limit: number) {
    return await User.query()
      .orderBy("points", "desc")
      .limit(limit)
      .whereHas("participantProfile", () => {})
      .preload("participantProfile");
  }
}
