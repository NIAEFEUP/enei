import ProductGroup from "#models/product_group";
import { createResource } from "../resource.js";
import { owningRelationFeature } from "../relations.js";

const ProductGroupResource = createResource({
  model: ProductGroup,
  features: [
    owningRelationFeature({
      products: {
        type: "one-to-many",
        target: {
          joinKey: "productGroupId",
          resourceId: "products",
        },
      },
    }),
  ],
});

export default ProductGroupResource;
