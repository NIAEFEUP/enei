import EventCard from "../event_card";
import { router } from "@inertiajs/react";

interface Speaker {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Event {
  id: number;
  title: string;
  type: "talk" | "workshop" | "night" | "meal" | "competition" | "networking" | "other";
  date: string;
  time: string;
  location: string;
  companyImage: string;
  speakers: Speaker[];
}

interface EventsPageProps {
  events: Event[];
}

export default function EventsPageApril14({ events }: EventsPageProps) {
  return (
    <div className="flex flex-col space-y-4 md:grid md:grid-cols-4 md:grid-rows-9 md:gap-4 md:space-y-0">
      <div className="col-span-4 col-start-1 row-start-1">
        <EventCard
          title={"Pequeno-Almoço"}
          type={"meal"}
          time={"09:00 - 10:00"}
          location={"Pavilhão Desportivo Luís Falcão"}
          speakers={[]}
        />
      </div>
      <div className="col-start-1 row-start-2">
        <EventCard
          id={events[3].id}
          title={events[3].title}
          type={events[3].type}
          time={events[3].time}
          location={events[3].location}
          speakers={events[3].speakers}
          onClick={() => router.visit(`/events/${events[3].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-3">
        <EventCard
          id={events[4].id}
          title={events[4].title}
          type={events[4].type}
          time={events[4].time}
          location={events[4].location}
          speakers={events[4].speakers}
          onClick={() => router.visit(`/events/${events[4].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-4">
        <EventCard
          id={events[5].id}
          title={events[5].title}
          type={events[5].type}
          time={events[5].time}
          location={events[5].location}
          speakers={events[5].speakers}
          onClick={() => router.visit(`/events/${events[5].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-5">
        <EventCard
          id={events[6].id}
          title={events[6].title}
          type={events[6].type}
          time={events[6].time}
          location={events[6].location}
          speakers={events[6].speakers}
          onClick={() => router.visit(`/events/${events[6].id}`)}
        />
      </div>
      <div className="col-start-2 row-span-4 row-start-2">
        <EventCard
          id={events[0].id}
          title={events[0].title}
          type={events[0].type}
          time={events[0].time}
          location={events[0].location}
          speakers={events[0].speakers}
          onClick={() => router.visit(`/events/${events[0].id}`)}
        />
      </div>
      <div className="col-start-3 row-span-4 row-start-2">
        <EventCard
          id={events[1].id}
          title={events[1].title}
          type={events[1].type}
          time={events[1].time}
          location={events[1].location}
          speakers={events[1].speakers}
          onClick={() => router.visit(`/events/${events[1].id}`)}
        />
      </div>
      <div className="col-start-4 row-span-4 row-start-2">
        <EventCard
          id={events[2].id}
          title={events[2].title}
          type={events[2].type}
          time={events[2].time}
          location={events[2].location}
          speakers={events[2].speakers}
          onClick={() => router.visit(`/events/${events[2].id}`)}
        />
      </div>
      <div className="col-span-1 col-start-2 row-start-6">
        <EventCard
          title={"Coffee Break"}
          type={"meal"}
          time={"11:15 - 12:15"}
          location={"Coffee Lounge - FEUP"}
          speakers={[]}
        />
      </div>
      <div className="col-span-2 row-start-7">
        <EventCard
          id={events[7].id}
          title={events[7].title}
          type={events[7].type}
          time={events[7].time}
          location={events[7].location}
          speakers={events[7].speakers}
          onClick={() => router.visit(`/events/${events[7].id}`)}
        />
      </div>
      <div className="col-span-4 col-start-1 row-start-8">
        <EventCard
          title={"Painel de Empresas"}
          type={"other"}
          time={"12:30 - 13:30"}
          location={"Auditório - FEUP"}
          speakers={[]}
        />
      </div>
      <div className="col-span-2 col-start-3 row-span-2 row-start-6">
        <EventCard
          title={events[8].title}
          type={events[8].type}
          time={events[8].time}
          location={events[8].location}
          speakers={events[8].speakers}
          onClick={() => router.visit(`/events/${events[8].id}`)}
        />
      </div>
      <div className="col-span-1 row-span-1 row-start-6">
        <EventCard
          title={events[9].title}
          type={events[9].type}
          time={events[9].time}
          location={events[9].location}
          speakers={events[9].speakers}
          onClick={() => router.visit(`/events/${events[9].id}`)}
        />
      </div>
      <div className="col-span-4 col-start-1 row-span-1 row-start-9">
        <EventCard
          title={"Almoço"}
          type={"meal"}
          time={"13:30 - 15:30"}
          location={"Relvado Central - FEUP"}
          speakers={[]}
        />
      </div>
      <div className="col-span-4 col-start-1 row-span-1 row-start-10">
        <EventCard
          title={"Sessão de Encerramento"}
          type={"other"}
          time={"15:30 - 17:00"}
          location={"Auditório - FEUP"}
          speakers={[]}
        />
      </div>
    </div>
  );
}
