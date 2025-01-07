import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Jose Sousa',
        email: '2409jmsousa@gmail.com',
        password: 'password123',
      },
      {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      },
      {
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
      },
    ])
  }
}
