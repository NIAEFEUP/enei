import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const admin1 = await User.create({
      isAdmin: true,
      email: 'admin@eneiconf.pt',
    })

    await admin1
      .related('accounts')
      .create({ id: 'credentials:admin@eneiconf.pt', password: 'password' })

    const user = await User.create({
      email: 'user@eneiconf.pt',
    })

    await user
      .related('accounts')
      .create({ id: 'credentials:user@eneiconf.pt', password: 'password' })
  }
}
