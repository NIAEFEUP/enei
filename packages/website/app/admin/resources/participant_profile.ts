import ParticipantProfile from '#models/participant_profile'
import { createResource } from '../resource.js'
import districts from '#data/enei/districts.json' with { type: 'json' }
import editions from '#data/enei/editions.json' with { type: 'json' }
import heardAbout from '#data/enei/signup/heard-about.json' with { type: 'json' }
import shirts from '#data/enei/signup/shirts.json' with { type: 'json' }
import transports from '#data/enei/signup/transports.json' with { type: 'json' }
import universities from '#data/enei/universities.json' with { type: 'json' }
import { owningRelationFeature } from '../relations.js'

const ParticipantProfileResource = createResource({
  model: ParticipantProfile,
  options: {
    properties: {
      // Ticket Info
      purchasedTicket: {
        availableValues: [
          { value: 'early-bird-without-housing', label: 'Early Bird (sem alojamento)' },
          { value: 'early-bird-with-housing', label: 'Early Bird (com alojamento)' },
        ],
      },
      // General Info
      phone: {
        type: 'phone',
      },
      // Student Info
      university: {
        availableValues: universities.map(({ id, name }) => ({ value: id, label: name })),
      },
      curricularYear: {
        availableValues: [
          { value: '1', label: '1º ano' },
          { value: '2', label: '2º ano' },
          { value: '3', label: '3º ano' },
          { value: '4', label: '4º ano' },
          { value: '5', label: '5º ano' },
          { value: 'already-finished', label: 'Já terminei o curso' },
        ],
      },
      municipality: {
        availableValues: districts.map(({ id, name }) => ({ value: id, label: name })),
      },
      // Logistics Info
      transports: {
        isArray: true,
        availableValues: transports.map(({ id, description }) => ({
          value: id,
          label: description,
        })),
      },
      // Communication Info
      heardAboutEnei: {
        availableValues: heardAbout,
      },
      shirtSize: {
        availableValues: shirts.map((value) => ({ value, label: value })),
      },
      attendedBeforeEditions: {
        isArray: true,
        availableValues: editions.map(({ year, location }) => ({
          value: year,
          label: `${year} - ${location}`,
        })),
      },
    },
  },
  features: [
    owningRelationFeature({
      users: {
        type: 'one-to-many',
        target: {
          joinKey: 'participantProfileId',
          resourceId: 'users',
        },
      },
    }),
  ],
})

export default ParticipantProfileResource
