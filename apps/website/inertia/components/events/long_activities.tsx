import { cn } from "~/lib/utils";
import { CardTitle } from "../ui/card";
import EventCard from "./event_card";

interface LongActivitesProps {
  currentActiveIndex: number;
}

export default function LongActivities({ currentActiveIndex }: LongActivitesProps) {
  return (
    <div className={cn("flex flex-col space-y-5", currentActiveIndex !== 0 ? "mb-5" : "")}>
      {currentActiveIndex !== 0 && <CardTitle>Atividades Longas</CardTitle>}

      {currentActiveIndex === 1 && (
        <div className="flex flex-grow flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <EventCard
            title={"Check-in"}
            type={"other"}
            time={"9:00 - 21:30"}
            location={"TBD"}
            speakers={[]}
          />
          <EventCard
            title={"Feira de Emprego"}
            type={"networking"}
            time={"14:00 - 18:30"}
            location={"Corredor B - FEUP"}
            speakers={[]}
          />

          <EventCard
            title={"Competição de Programação"}
            type={"competition"}
            time={"14:30 - 18:30"}
            location={"TBD - FEUP"}
            speakers={[]}
          />
        </div>
      )}

      {currentActiveIndex === 2 && (
        <div className="flex flex-grow flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <EventCard
            title={"Check-in"}
            type={"other"}
            time={"9:00 - 21:30"}
            location={"TBD"}
            speakers={[]}
          />
          <EventCard
            title={"Feira de Emprego"}
            type={"networking"}
            time={"14:00 - 18:30"}
            location={"Corredor B - FEUP"}
            speakers={[]}
          />

          <EventCard
            title={"Competição de Pitches"}
            type={"competition"}
            time={"14:30 - 18:30"}
            location={"TBD - FEUP"}
            speakers={[]}
          />
        </div>
      )}

      {currentActiveIndex === 3 && (
        <div className="flex flex-grow flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <EventCard
            title={"Check-in"}
            type={"other"}
            time={"9:00 - 12:00"}
            location={"TBD - FEUP"}
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
