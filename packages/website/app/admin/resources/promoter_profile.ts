import PromoterProfile from "#models/promoter_profile";
import { owningRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";

const PromoterProfileResource = createResource({
  model: PromoterProfile,
  features: [
    owningRelationFeature({
      users: {
        type: "one-to-many",
        target: {
          resourceId: "users",
          joinKey: "promoterProfileId",
        },
      },
    }),
  ],
});

export default PromoterProfileResource;
