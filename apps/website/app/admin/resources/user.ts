import User from "#models/user";
import { createResource } from "../resource.js";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";

const UserResource = createResource({
  model: User,
  options: {
    properties: {
      participantProfileId: {
        reference: "participant_profiles",
      },
      promoterProfileId: {
        reference: "promoter_profiles",
      },
      speakerProfileId: {
        reference: "speaker_profiles",
      },
      referringPromoterId: {
        reference: "users",
      },
      referrerId: {
        reference: "users",
      },
    },
  },
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      accounts: {
        type: "one-to-many",
        target: {
          joinKey: "userId",
          resourceId: "accounts",
        },
      },
      orders: {
        type: "one-to-many",
        target: {
          joinKey: "userId",
          resourceId: "orders",
        },
      },
      indirectReferrals: {
        type: "one-to-many",
        target: {
          joinKey: "referringPromoterId",
          resourceId: "users",
        },
      },
      referrals: {
        type: "one-to-many",
        target: {
          joinKey: "referrerId",
          resourceId: "users",
        },
      },
    }),
  ],
});

export default UserResource;
