import UserCreated from '#events/user_created'
import UserEmailVerified from '#events/user_email_verified'
import SendVerificationEmail from '#listeners/send_verification_email'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export class UserService {
  async createUserWithCredentials(email: string, password: string) {
    const committedUser = await db.transaction(async (trx) => {
      const user = await User.create({ email }, { client: trx })
      await user.related('accounts').create({ id: `credentials:${email}`, password })

      return user
    })

    UserCreated.dispatch(committedUser)

    return committedUser
  }

  sendVerificationEmail(user: User) {
    const listener = new SendVerificationEmail()
    listener.handle(new UserCreated(user))
  }

  async verifyEmail(email: string) {
    const verifiedUser = await db.transaction(async (trx) => {
      const user = await User.findByOrFail('email', email, { client: trx })
      if (user.isEmailVerified()) return null

      user.emailVerifiedAt = DateTime.now()
      return await user.save()
    })

    if (!verifiedUser) return null

    UserEmailVerified.dispatch(verifiedUser)
    return verifiedUser
  }
}
