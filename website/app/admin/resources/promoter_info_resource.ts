import dbConfig from "#config/database"
import PromoterInfo from "#models/promoter_info"
import { LucidResource } from "@adminjs/adonis"

const PromoterInfoResource = {
  resource: new LucidResource(PromoterInfo, dbConfig.connection),
  options: {
    properties: {
      promoterInfoId: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      }
    },
  }
}

export default PromoterInfoResource