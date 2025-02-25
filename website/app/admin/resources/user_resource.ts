import dbConfig from "#config/database"
import User from "#models/user"
import { LucidResource } from "@adminjs/adonis"

const UserResource = {
  resource: new LucidResource(User, dbConfig.connection),
  options: {
    properties: {
      promoterInfoId: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      points: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      }
    },
  }
}

export default UserResource