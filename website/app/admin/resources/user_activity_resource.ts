import dbConfig from "#config/database"
import UserActivity from "#models/user_activity"
import { LucidResource } from "@adminjs/adonis"
import type { ResourceWithOptions } from "adminjs"

const UserActivityResource: ResourceWithOptions = {
    resource: new LucidResource(UserActivity, dbConfig.connection),
    options: {
        properties: {
            type: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            }
        },
    },
}
  

export default UserActivityResource