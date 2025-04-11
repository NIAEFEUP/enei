import { CardTitle } from "~/components/ui/card";
import EventsPageApril11 from "./events_page_april11";
import EventsPageApril12 from "./events_page_april12";
import EventsPageApril13 from "./events_page_april13";
import EventsPageApril14 from "./events_page_april14";

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

interface EventsProgramProps {
  currentActiveIndex: number;
  eventsByDay: Record<string, Event[]>;
}

export default function EventsProgram({ currentActiveIndex, eventsByDay }: EventsProgramProps) {
  return (
    <div className="flex flex-col space-y-5">
      <CardTitle>Programa</CardTitle>

      {currentActiveIndex === 0 && <EventsPageApril11 events={eventsByDay["11-04-2025"]} />}
      {currentActiveIndex === 1 && <EventsPageApril12 events={eventsByDay["12-04-2025"]} />}
      {currentActiveIndex === 2 && <EventsPageApril13 events={eventsByDay["13-04-2025"]} />}
      {currentActiveIndex === 3 && <EventsPageApril14 events={eventsByDay["14-04-2025"]} />}
    </div>
  );
}
