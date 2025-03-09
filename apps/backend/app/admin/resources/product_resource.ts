import dbConfig from "#config/database"
import Product from "#models/product"
import { LucidResource } from "@adminjs/adonis"

const ProductResource = {
  resource: new LucidResource(Product, dbConfig.connection),
  options: {
    properties: {
      promoterInfoId: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      }
    },
  }
}

export default ProductResource