import { UserActivityType, type UserActivityDescription } from "../../types/user_activity.js"
import UserActivity from "#events/user_activity"
import { inject } from "@adonisjs/core"

import PointsService from "#services/points_service"

@inject()
export default class UserActivityListener {
    private pointsAttributionMap: Map<UserActivityType, (activity: UserActivityDescription) => Promise<void>>

    constructor(private pointsService: PointsService) {
       this.pointsAttributionMap = new Map([
           [UserActivityType.Referral, this.pointsService.referralPointAttribution]
       ])
    }

    async handle(event: UserActivity) {
        this.pointsAttributionMap.get(event.data.description.type)?.(event.data)
    }
}
