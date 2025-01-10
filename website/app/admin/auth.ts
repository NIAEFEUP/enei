import { DefaultAuthProvider, DefaultAuthenticatePayload } from 'adminjs'

import componentLoader from './component_loader.js'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

/**
 * Your "authenticate" function. Depending on the auth provider used, the payload may be different.
 *
 * The default authentication provider uses email and password to authenticate. You can modify this
 * function to use email & password to verify if the User exists and if their passwords match.
 *
 * The default implementation below will let any in, so make sure to update it.
 */
const authenticate = async ({ email, password }: DefaultAuthenticatePayload) => {
  const user = await User.query().where('email', email).first()

  if (!user) {
    return null
  }

  const isPasswordValid = await hash.verify(user.password, password)

  if (!isPasswordValid) {
    return null
  }

  const isAdmin = user.isAdmin

  if (!isAdmin) {
    return null
  }

  return { email: user.email, id: user.id }
}
const authProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate,
})

export default authProvider
