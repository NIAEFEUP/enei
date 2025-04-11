import EventCard from "../event_card";
import { router } from "@inertiajs/react";

interface EventsPageProps {
  events: Event[];
}

interface Event {
  id: number;
  title: string;
  type: "talk" | "workshop" | "night" | "meal" | "competition" | "networking" | "other" | "painel";
  date: string;
  time: string;
  location: string;
}

export default function EventsPageApril11({ events }: EventsPageProps) {
  return (
    <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:grid-rows-5 md:gap-4 md:space-y-0">
      <div className="col-start-2 row-span-2 row-start-1">
        <EventCard
          title={"Boas-Vindas"}
          type={"other"}
          time={"14:00 - 18:30"}
          location={"Jardim do ISEP"}
          speakers={[]}
        />
      </div>
      <div className="col-start-1 row-span-4 row-start-1">
        <EventCard
          title={"Check-in"}
          type={"other"}
          time={"14:00 - 23:30"}
          location={"Auditório Magno - ISEP"}
          speakers={[]}
        />
      </div>
      <div className="col-start-2 row-start-3">
        <EventCard
          id={events[0].id}
          title={events[0].title}
          type={events[0].type}
          time={events[0].time}
          location={events[0].location}
          speakers={[]}
          onClick={() => router.visit(`/events/${events[0].id}`)}
        />
      </div>
      <div className="col-start-2 row-start-4">
        <EventCard
          title={"Convívio e Churrasco"}
          type={"night"}
          time={"20:00 - 23:00"}
          location={"aeISEP"}
          speakers={[]}
        />
      </div>
      <div className="col-span-2 col-start-1 row-start-5">
        <EventCard
          title={"Snap Shots"}
          type={"night"}
          time={"23:00 - 4:00"}
          location={"aeISEP"}
          speakers={[]}
        />
      </div>
    </div>
  );
}
