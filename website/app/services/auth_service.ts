import UserCreated from '#events/user_created'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

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
}
