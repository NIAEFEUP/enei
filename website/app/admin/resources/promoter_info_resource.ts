import dbConfig from "#config/database"
import PromoterProfile from "#models/promoter_profile"
import { LucidResource } from "@adminjs/adonis"

const PromoterProfileResource = {
  resource: new LucidResource(PromoterProfile, dbConfig.connection),
  options: {
    properties: {
      promoterInfoId: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      }
    },
  }
}

export default PromoterProfileResource