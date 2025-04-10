import Event from "#models/event";

interface SpeakerProfileEventCardProps {
  event: Event;
}

export default function SpeakerProfileEventCard({ event }: SpeakerProfileEventCardProps) {
  return (
    <article className="bg-enei-workshop border-enei-workshop flex flex-col gap-y-2 rounded-md border-l-[1em] p-4">
      <h2 className="text-enei-blue text-xl font-bold">{event.title}</h2>
      <p className="text-enei-blue">{event.location}</p>
      <p className="text-enei-blue text-lg">{event.description}</p>
    </article>
  );
}
