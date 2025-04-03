import EventCard from "../event_card";

export default function EventsPageApril11() {
  return (
    <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:grid-rows-5 md:gap-4 md:space-y-0">
      <div className="col-start-2 row-span-2 row-start-1">
        <EventCard
          title={"Boas-Vindas"}
          type={"other"}
          time={"14:00 - 18:30"}
          location={"TBD - ISEP"}
          speakers={[]}
        />
      </div>
      <div className="col-start-1 row-span-4 row-start-1">
        <EventCard
          title={"Check-in"}
          type={"other"}
          time={"14:00 - 23:30"}
          location={"TBD - ISEP"}
          speakers={[]}
        />
      </div>
      <div className="col-start-2 row-start-3">
        <EventCard
          title={"Sessão de Abertura"}
          type={"other"}
          time={"18:30 - 20:00"}
          location={"Auditório - ISEP"}
          speakers={[]}
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
