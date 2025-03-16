import EventUser from '#models/event_user'
import { createResource } from '../resource.js'

const EventUserResource = createResource({
  model: EventUser,
  options: {
    navigation: false,
    properties: {
      eventId: {
        reference: 'events',
      },
      userId: {
        reference: 'users',
      },
    },
  },
})

export default EventUserResource
