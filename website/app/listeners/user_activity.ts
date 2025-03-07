import { UserActivityType } from "../../types/user_activity.js"
import UserActivity from "#events/user_activity"

export default class UserActivityListener {
    private actionMap: Map<UserActivityType, (activity: UserActivity) => void>

    constructor() {
       this.actionMap = new Map([
           [UserActivityType.Referral, this.handleReferral]
       ])
    }

    async handle(event: UserActivity) {
        const action = this.actionMap.get(event.description.type)
        if(action) action(event)
    }

    handleReferral(activity: UserActivity) {
        
    }
}