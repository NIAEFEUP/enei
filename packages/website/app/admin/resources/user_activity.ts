import UserActivity from '#models/user_activity'
import { createResource } from '../resource.js'

const UserActivityResource = createResource({
  model: UserActivity,
  options: {
    properties: {
      type: {
        availableValues: [
          {
            value: 'referral',
            label: 'Referral',
          },
        ],
      },
      description: {
        type: 'key-value',
      },
    },
  },
})

export default UserActivityResource
