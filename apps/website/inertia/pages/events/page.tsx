import { DaySelector } from "~/components/events/day_selector";
import { useEffect, useMemo, useState } from "react";
import LongActivities from "~/components/events/long_activities";
import EventsProgram from "~/components/events/schedule/events_program";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { Card } from "@enei/shadcn/ui/card";

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

interface EventsPageProps {
  currentDay: String;
  events: Event[];
}

function splitEventsByDay(events: Event[]) {
  return events.reduce(
    (acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    },
    {} as Record<string, Event[]>,
  );
}

export default function EventsPage({ currentDay, events }: EventsPageProps) {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  const eventsByDay = splitEventsByDay(events);

  // If the current day is an ENEI day, set the active index to the corresponding day.
  const eneiDates = useMemo(() => [
    new Date("2025-04-11").toDateString(),
    new Date("2025-04-12").toDateString(),
    new Date("2025-04-13").toDateString(),
    new Date("2025-04-14").toDateString(),
  ], []);

  useEffect(() => {
    for (const [i, eneiDate] of eneiDates.entries()) {
      if (currentDay === eneiDate) {
        setCurrentActiveIndex(i);
        break;
      }
    }
  }, [currentDay, eneiDates])

  return (
    <Page title="Eventos" variant="beige" className="bg-enei-beige">
      <Container>
        <div className="relative z-10 mt-10 flex justify-center">
          <Card className="mx-4 w-full max-w-7xl border-transparent bg-transparent shadow-transparent">
            <div className="mb-10">
              <DaySelector
                activeIndex={currentActiveIndex}
                setActiveIndex={(index) => {
                  setCurrentActiveIndex(index);
                }}
                days={["11 de abril", "12 de abril", "13 de abril", "14 de abril"]}
              />
            </div>
            {/*
            TODO: highlights

          <CardTitle className="mt-10">Destaques</CardTitle>
          <CardTitle className="mt-10">O dia todo</CardTitle>
          <div className="space-y-3">
            {events
              .filter((event) => event.date === activeDate)
              .map((event) => (
                <EventCard
                  title={'Check-in'}
                  type={'activity'}
                  time={'14:00 - 23:00'}
                  location={'TBD - ISEP'}
                  speakers={[]}
                />
              ))}
          </div>
          */}

            <LongActivities currentActiveIndex={currentActiveIndex} eventsByDay={eventsByDay} />

            <EventsProgram currentActiveIndex={currentActiveIndex} eventsByDay={eventsByDay} />
          </Card>
        </div>
      </Container>
    </Page>
  );
}
