import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class LeaderboardController {
    private USER_LIMIT = 50

    async index({ inertia }: HttpContext) {
        const leaderboard = await User.query()
            .orderBy('points', 'desc')
            .limit(this.USER_LIMIT)
            .whereHas('participantProfile', () => {})
            .preload('participantProfile')

        return inertia.render('leaderboard', { leaderboard })
    }
}