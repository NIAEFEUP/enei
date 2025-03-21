import SpeakerProfile from '#models/speaker_profile'
import { owningRelationFeature } from '../relations.js'
import { createResource } from '../resource.js'

const SpeakerProfileResource = createResource({
  model: SpeakerProfile,
  features: [
    owningRelationFeature({
      users: {
        type: 'one-to-many',
        target: {
          resourceId: 'users',
          joinKey: 'speakerProfileId',
        },
      },
      events: {
        type: 'many-to-many',
        target: {
          resourceId: 'events',
        },
        junction: {
          joinKey: 'speakerProfileId',
          inverseJoinKey: 'eventId',
          throughResourceId: 'event_speakers',
        },
      },
    }),
  ],
})

export default SpeakerProfileResource
