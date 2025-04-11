import User from "#models/user";
import Event from "#models/event";
import EventCheckinListener from "#listeners/event_checkin_listeners";
import EventCheckin from "#events/event_checkin";

export default class EventService {
  async isRegistered(user: User, event: Event) {
    const isRegistered = await event
      .related("registeredUsers")
      .query()
      .where("user_id", user.id)
      .first();

    return !!isRegistered;
  }

  async isCheckedIn(user: User, event: Event) {
    const isChecked = await event
      .related("checkedInUsers")
      .query()
      .where("user_id", user.id)
      .first();

    return !!isChecked;
  }

  async register(user: User, event: Event) {
    await event.related("registeredUsers").attach([user!.id]);

    event.ticketsRemaining--;

    event.save();
  }

  async checkin(user: User, event: Event) {
    await event.related("checkedInUsers").attach({
      [user.id]: { checked_in_at: new Date() },
    });
    await event.save();

    const listener = new EventCheckinListener()
    listener.handle(
      new EventCheckin(this.getPoints(event, user), user)
    )
  }

  getPoints(event: Event, user: User) {
    return 0
  }
}
