import StaffProfile from "#models/staff_profile";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";

const StaffProfileResource = createResource({
  model: StaffProfile,
  options: {
    properties: {
      departmentId: {
        reference: "departments",
      },
    },
  },
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      users: {
        type: "one-to-many",
        target: {
          resourceId: "users",
          joinKey: "staffProfileId",
        },
      },
    }),
  ],
});

export default StaffProfileResource;
