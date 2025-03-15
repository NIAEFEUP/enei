import BaseLayout from '~/layouts/base'
import { DaySelector } from '~/components/events/day_selector'
import { useState } from 'react'
import { Card, CardTitle } from '~/components/ui/card'
import EventCard from '~/components/events/event_card'

interface EventsPageProps {
  currentDay: String
}

export default function EventsPage({ currentDay }: EventsPageProps) {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0)

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
          <div className="flex flex-row gap-3">
            <EventCard
              title="Cloud Computing"
              subtitle="Cenas para encher"
              type="Palestra"
              time="09:00 - 10:00"
              location="B302 - FEUP"
              isRegistered={true}
              speakers={[
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
              ]}
            />
            <EventCard
              title="Cloud Computing"
              subtitle="Cenas para encher"
              type="Palestra"
              time="09:00 - 10:00"
              location="B302 - FEUP"
              isRegistered={true}
              speakers={[
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: '/images/speakers/afonso-santos.jpg',
                },
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
              ]}
            />

            <EventCard
              title="Cloud Computing"
              subtitle="Cenas para encher"
              type="Palestra"
              time="09:00 - 10:00"
              location="B302 - FEUP"
              isRegistered={true}
              speakers={[
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
              ]}
            />

            <EventCard
              title="Cloud Computing"
              subtitle="Cenas para encher"
              type="Palestra"
              time="09:00 - 10:00"
              location="B302 - FEUP"
              isRegistered={true}
              speakers={[
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
                {
                  firstName: 'Mike',
                  lastName: 'Pound',
                  profilePicture: 'https://randomuser.me/api',
                },
              ]}
            />
          </div>
        </Card>
      </div>
    </BaseLayout>
  )
}
