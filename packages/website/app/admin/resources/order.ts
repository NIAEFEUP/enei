import Order from "#models/order";
import { createResource } from "../resource.js";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";

const OrderResource = createResource({
  model: Order,
  options: {
    properties: {
      userId: {
        reference: "users",
      },
    },
  },
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      products: {
        type: "many-to-many",
        junction: {
          joinKey: "orderId",
          inverseJoinKey: "productId",
          throughResourceId: "order_products",
        },
        target: {
          resourceId: "products",
        },
      },
    }),
  ],
});

export default OrderResource;
