import BaseLayout from '~/layouts/base'
import { DaySelector } from '~/components/events/day_selector'
import { useState } from 'react'
import { Card, CardTitle } from '~/components/ui/card'
import EventsPageApril11 from '~/components/events/schedule/events_page_april11'
import EventsPageApril12 from '~/components/events/schedule/events_page_april12'
import EventsPageApril13 from '~/components/events/schedule/events_page_april13'
import EventsPageApril14 from '~/components/events/schedule/events_page_april14'
import EventCard from '~/components/events/event_card'

interface Speaker {
  firstName: string
  lastName: string
  profilePicture: string
}

interface Event {
  id: number
  title: string
  type: 'activity' | 'workshop' | 'other'
  date: string
  time: string
  location: string
  companyImage: string
  speakers: Speaker[]
}

interface EventsPageProps {
  currentDay: String
  events: Event[]
}

function splitEventsByDay(events: Event[]) {
  return events.reduce(
    (acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = []
      }
      acc[event.date].push(event)
      return acc
    },
    {} as Record<string, Event[]>
  )
}

export default function EventsPage({ currentDay, events }: EventsPageProps) {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0)

  const eventsByDay = splitEventsByDay(events)

  // If the current day is an ENEI day, set the active index to the corresponding day.
  const eneiDates = [
    new Date('2025-04-11').toDateString(),
    new Date('2025-04-12').toDateString(),
    new Date('2025-04-13').toDateString(),
    new Date('2025-04-14').toDateString(),
  ]
  for (const [i, eneiDate] of eneiDates.entries()) {
    if (currentDay === eneiDate) {
      setCurrentActiveIndex(i)
      break
    }
  }

  return (
    <BaseLayout title="Eventos" className="bg-enei-beige ">
      <div className="flex justify-center mt-10 relative z-10">
        <Card className="w-full max-w-7xl mx-auto border-transparent shadow-transparent bg-transparent">
          <div className="mb-10">
            <DaySelector
              activeIndex={currentActiveIndex}
              setActiveIndex={(index) => {
                setCurrentActiveIndex(index)
              }}
              days={['11 de abril', '12 de abril', '13 de abril', '14 de abril']}
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
                  key={event.id}
                  title={event.title}
                  type={event.type}
                  time={event.time}
                  location={event.location}
                  isRegistered={true}
                  speakers={event.speakers}
                  onClick={() => {
                    router.visit(`/events/${event.id}`)
                  }}
                />
              ))}
          </div>
          */}
          <CardTitle className="mt-5 mb-5">Atividades Longas</CardTitle>
          {currentActiveIndex === 0 && (
            <div>
              <EventCard
                title={'Check-in'}
                type={'activity'}
                time={'14:00 - 23:00'}
                location={'TBD - ISEP'}
                speakers={[]}
              />
            </div>
          )}

          {currentActiveIndex === 1 && (
            <div className="flex flex-row space-x-4">
              <EventCard
                title={'Check-in'}
                type={'activity'}
                time={'9:00 - 21:30'}
                location={'TBD'}
                speakers={[]}
              />
              <EventCard
                title={'Feira de Emprego'}
                type={'activity'}
                time={'14:00 - 18:30'}
                location={'Corredor B - FEUP'}
                speakers={[]}
              />

              <EventCard
                title={'Competição de Programação'}
                type={'activity'}
                time={'14:30 - 18:30'}
                location={'TBD - FEUP'}
                speakers={[]}
              />
            </div>
          )}

          {currentActiveIndex === 2 && (
            <div className="flex flex-row space-x-4">
              <EventCard
                title={'Check-in'}
                type={'activity'}
                time={'9:00 - 21:30'}
                location={'TBD'}
                speakers={[]}
              />
              <EventCard
                title={'Feira de Emprego'}
                type={'activity'}
                time={'14:00 - 18:30'}
                location={'Corredor B - FEUP'}
                speakers={[]}
              />

              <EventCard
                title={'Competição de Pitches'}
                type={'activity'}
                time={'14:30 - 18:30'}
                location={'TBD - FEUP'}
                speakers={[]}
              />

              <EventCard
                title={'Sessão de Cocktails'}
                type={'activity'}
                time={'18:00 - 19:30'}
                location={'Coffee Lounge - FEUP'}
                speakers={[]}
              />
            </div>
          )}


          {currentActiveIndex === 3 && (
            <div className="flex flex-row space-x-4">
              <EventCard
                title={'Check-in'}
                type={'activity'}
                time={'9:00 - 12:00'}
                location={'TBD - FEUP'}
                speakers={[]}
              />
              <EventCard
                title={'Feira de Emprego'}
                type={'activity'}
                time={'9:00 - 14:00'}
                location={'Corredor B - FEUP'}
                speakers={[]}
              />

              <EventCard
                title={'Competição de Pitches'}
                type={'activity'}
                time={'14:30 - 18:30'}
                location={'TBD - FEUP'}
                speakers={[]}
              />

              <EventCard
                title={'Sessão de Cocktails'}
                type={'activity'}
                time={'18:00 - 19:30'}
                location={'Coffee Lounge - FEUP'}
                speakers={[]}
              />
            </div>
          )}

          <CardTitle className="mt-5 mb-5">Programa</CardTitle>

          {currentActiveIndex === 0 && <EventsPageApril11 events={eventsByDay['11-04-2025']} />}
          {currentActiveIndex === 1 && <EventsPageApril12 events={eventsByDay['12-04-2025']} />}
          {currentActiveIndex === 2 && <EventsPageApril13 events={eventsByDay['13-04-2025']} />}
          {currentActiveIndex === 3 && <EventsPageApril14 events={eventsByDay['14-04-2025']} />}
        </Card>
      </div>
    </BaseLayout>
  )
}
