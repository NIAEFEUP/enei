import { owningRelationFeature, targetRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";
import Company from "#models/company";

const CompanyResource = createResource({
  model: Company,
  options: {
    properties: {

    },
  },
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      representatives: {
        type: "one-to-many",
        target: {
          resourceId: "representative_profiles",
          joinKey: "companyId",
        },
      },
    }),
  ],
});

export default CompanyResource;
