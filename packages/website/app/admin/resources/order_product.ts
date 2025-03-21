import OrderProduct from '#models/order_product'
import { createResource } from '../resource.js'

const OrderProductResource = createResource({
  model: OrderProduct,
  options: {
    properties: {
      orderId: {
        reference: 'orders',
      },
      productId: {
        reference: 'products',
      },
    },
  },
})

export default OrderProductResource
