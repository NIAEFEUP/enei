import Department from "#models/department";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";

const DepartmentResource = createResource({
  model: Department,
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      staffProfiles: {
        type: "one-to-many",
        target: {
          resourceId: "staff_profiles",
          joinKey: "departmentId",
        },
      },
    }),
  ],
});

export default DepartmentResource;
