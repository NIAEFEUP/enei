import { owningRelationFeature, targetRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";
import RepresentativeProfile from "#models/representative_profile";

const RepresentativeProfileResource = createResource({
  model: RepresentativeProfile,
  options: {
    properties: {

    },
  },
  features: [
     owningRelationFeature({
      users: {
        type: "one-to-many",
        target: {
          resourceId: "users",
          joinKey: "representativeProfileId",
        },
      },
    }),
  ]
});

export default RepresentativeProfileResource;
