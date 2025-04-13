import User from "#models/user";
import EventService from "#services/event_service";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
  async run() {
    const eventService = new EventService();

    const users = await User.all();

    for (const user of users) {
      await eventService.checkInBasedOnTimeAttendance(user);
    }
  }
}
