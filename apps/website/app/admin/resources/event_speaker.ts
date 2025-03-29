import EventSpeaker from "#models/event_speaker";
import { createResource } from "../resource.js";

const EventSpeakerResource = createResource({
  model: EventSpeaker,
  options: {
    navigation: false,
    properties: {
      eventId: {
        reference: "events",
      },
      speakerProfileId: {
        reference: "speaker_profiles",
      },
    },
  },
});

export default EventSpeakerResource;
