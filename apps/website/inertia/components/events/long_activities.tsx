import { cn } from "~/lib/utils";
import { CardTitle } from "../ui/card";
import EventCard from "./event_card";
import { useMemo } from "react";
import { router } from "@inertiajs/react";

interface LongActivitesProps {
  currentActiveIndex: number;
  eventsByDay: Record<string, Event[]>;
}

interface Speaker {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Event {
  id: number;
  title: string;
  type: "talk" | "workshop" | "night" | "meal" | "competition" | "networking" | "other" | "painel";
  date: string;
  time: string;
  location: string;
  companyImage: string;
  speakers: Speaker[];
}

export default function LongActivities({ currentActiveIndex, eventsByDay }: LongActivitesProps) {
  const events = useMemo(() => {
    const day = ["11-04-2025", "12-04-2025", "13-04-2025", "14-04-2025"][currentActiveIndex];
    return eventsByDay[day];
  }, [currentActiveIndex, eventsByDay]);

  return (
    <div className={cn("flex flex-col space-y-5", currentActiveIndex !== 0 ? "mb-5" : "")}>
      {currentActiveIndex !== 0 && <CardTitle>Atividades Longas</CardTitle>}

      {currentActiveIndex === 1 && (
        <div className="flex flex-grow flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <EventCard
            title={"Check-in"}
            type={"other"}
            time={"9:00 - 21:30"}
            location={"ISEP (manhã) | FEUP (tarde)"}
            speakers={[]}
          />
          <EventCard
            title={"Feira de Emprego"}
            type={"networking"}
            time={"13:30 - 19:00"}
            location={"Corredor B - FEUP"}
            speakers={[]}
          />
          <EventCard
            id={events[18].id}
            title={events[18].title}
            type={events[18].type}
            time={events[18].time}
            location={events[18].location}
            speakers={events[18].speakers}
            onClick={() => router.visit(`/events/${events[18].id}`)}
          />
        </div>
      )}

      {currentActiveIndex === 2 && (
        <div className="flex flex-grow flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <EventCard
            title={"Check-in"}
            type={"other"}
            time={"9:00 - 21:30"}
            location={"ISEP (manhã) | FEUP (tarde)"}
            speakers={[]}
          />
          <EventCard
            title={"Feira de Emprego"}
            type={"networking"}
            time={"13:30 - 19:30"}
            location={"Corredor B - FEUP"}
            speakers={[]}
          />
          <EventCard
            id={events[18].id}
            title={events[18].title}
            type={events[18].type}
            time={events[18].time}
            location={events[18].location}
            speakers={events[18].speakers}
            onClick={() => router.visit(`/events/${events[18].id}`)}
          />
        </div>
      )}

      {currentActiveIndex === 3 && (
        <div className="flex flex-grow flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <EventCard
            title={"Check-in"}
            type={"other"}
            time={"9:00 - 17:00"}
            location={"FEUP"}
            speakers={[]}
          />
          <EventCard
            title={"Feira de Emprego"}
            type={"networking"}
            time={"9:30 - 14:00"}
            location={"Corredor B - FEUP"}
            speakers={[]}
          />
        </div>
      )}
    </div>
  );
}
