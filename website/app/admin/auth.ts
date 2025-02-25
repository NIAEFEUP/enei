import { DefaultAuthProvider } from 'adminjs'
import type { CurrentAdmin, DefaultAuthenticatePayload } from 'adminjs'

import componentLoader from './component_loader.js'
import Account from '#models/account'
import { errors } from '@adonisjs/auth'

/**
 * Your "authenticate" function. Depending on the auth provider used, the payload may be different.
 *
 * The default authentication provider uses email and password to authenticate. You can modify this
 * function to use email & password to verify if the User exists and if their passwords match.
 *
 * The default implementation below will let any in, so make sure to update it.
 */

const authProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async (payload: DefaultAuthenticatePayload): Promise<CurrentAdmin | null> => {
    const { email, password } = payload

    try {
      const account = await Account.verifyCredentials(`credentials:${email}`, password)
      await account.load('user')

      if (!account.user.isAdmin)
        return null
      
      return {
        email: account.user.email
      }
    } catch (error) {
      if (error instanceof errors.E_INVALID_CREDENTIALS) {
        return null
      }

      throw error
    }
  },
})

export default authProvider
