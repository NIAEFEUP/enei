import Account from '#models/account'
import { targetRelationFeature } from '../relations.js'
import { createResource } from '../resource.js'

const AccountResource = createResource({
  model: Account,
  options: {
    properties: {
      userId: {
        reference: 'users',
      },
    },
  },
  features: [targetRelationFeature()],
})

export default AccountResource
