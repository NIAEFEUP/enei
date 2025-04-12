import EventCheckin from "#models/event_checkin";
import { createResource } from "../resource.js";

const EventCheckinsResource = createResource({
  model: EventCheckin,
  options: {
    navigation: false,
    properties: {
      eventId: {
        reference: "events",
      },
      userId: {
        reference: "users",
      },
    },
  },
});

export default EventCheckinsResource;
