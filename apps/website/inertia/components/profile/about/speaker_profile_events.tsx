import Event from "#models/event";
import SpeakerProfileEventCard from "./speaker_profile_event_card";

interface SpeakerProfileEventsProps {
  events: Array<Event>;
}

export default function SpeakerProfileEvents({ events }: SpeakerProfileEventsProps) {
  return (
    <section className="mt-4">
      {events?.map((event) => <SpeakerProfileEventCard event={event} />)}
    </section>
  );
}
