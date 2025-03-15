import BaseLayout from '~/layouts/base'
import { DaySelector } from '~/components/events/day_selector'
import { useState } from 'react'
import { Card, CardTitle } from '~/components/ui/card'
import EventCard from '~/components/events/event_card'
import { router } from '@inertiajs/react'

interface Speaker {
  firstName: string
  lastName: string
  profilePicture: string
}

interface Event {
  id: number
  title: string
  type: string
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

export default function EventsPage({ currentDay, events }: EventsPageProps) {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0)

  const dateMapping = ['11-04-2025', '12-04-2025', '13-04-2025', '14-04-2025']
  const activeDate = dateMapping[currentActiveIndex]

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
          <DaySelector
            activeIndex={currentActiveIndex}
            setActiveIndex={(index) => {
              console.log('Day selected:', index)
              setCurrentActiveIndex(index)
            }}
            days={['11 de abril', '12 de abril', '13 de abril', '14 de abril']}
          />
          {/*
            TODO: highlights
          <CardTitle className="mt-10">Destaques</CardTitle>
          */}
          <CardTitle className="mt-10">O dia todo</CardTitle>
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
        </Card>
      </div>
    </BaseLayout>
  )
}
