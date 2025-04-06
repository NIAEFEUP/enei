import Event from "#models/event";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";

const EventResource = createResource({
  model: Event,
  options: {
    properties: {
      description: {
        type: "richtext",
      },
      extraInfo: {
        type: "richtext",
      },
      productGroupId: {
        reference: "product_groups",
      },
    },
  },
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      speakers: {
        type: "many-to-many",
        target: {
          resourceId: "speaker_profiles",
        },
        junction: {
          joinKey: "eventId",
          inverseJoinKey: "speakerProfileId",
          throughResourceId: "event_speakers",
        },
      },
      registeredUsers: {
        type: "many-to-many",
        target: {
          resourceId: "users",
        },
        junction: {
          joinKey: "eventId",
          inverseJoinKey: "userId",
          throughResourceId: "event_users",
        },
      },
    }),
  ],
});

export default EventResource;
