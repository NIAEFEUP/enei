import dbConfig from "#config/database"
import Order from "#models/order"
import { LucidResource } from "@adminjs/adonis"

const OrderResource = {
  resource: new LucidResource(Order, dbConfig.connection),
  options: {
    properties: {
      promoterInfoId: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      }
    },
  }
}

export default OrderResource