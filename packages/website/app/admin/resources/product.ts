import Product from "#models/product";
import { createResource } from "../resource.js";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";

const ProductResource = createResource({
  model: Product,
  options: {
    properties: {
      description: {
        type: "richtext",
      },
      productGroupId: {
        reference: "product_groups",
      },
      restrictions: {
        type: "key-value",
      },
    },
  },
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      orders: {
        type: "many-to-many",
        junction: {
          joinKey: "productId",
          inverseJoinKey: "orderId",
          throughResourceId: "order_products",
        },
        target: {
          resourceId: "orders",
        },
      },
    }),
  ],
});

export default ProductResource;
