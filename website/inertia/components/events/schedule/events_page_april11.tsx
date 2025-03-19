import EventCard from '../event_card'

interface Speaker {
  firstName: string
  lastName: string
  profilePicture: string
}

interface Event {
  id: number
  title: string
  type: 'talk' | 'workshop' | 'night' | 'meal' | 'competition' | 'networking' | 'other'
  date: string
  time: string
  location: string
  companyImage: string
  speakers: Speaker[]
}

interface EventsPageProps {
  events: Event[]
}

export default function EventsPageApril11({ events }: EventsPageProps) {
  console.log(events)
  return (
    <div className="flex flex-col spacae-y-4 md:grid md:grid-cols-1 md:grid-rows-4 md:gap-4 md:space-y-0">
      <div className="col-start-1 row-start-1 row-span-2">
        <EventCard
          title={'Check-in e Boas-Vindas'}
          type={'other'}
          time={'14:00 - 18:30'}
          location={'TBD - ISEP'}
          speakers={[]}
        />
      </div>
      <div className="col-start-1 row-start-3">
        <EventCard
          title={'Sessão de Abertura'}
          type={'other'}
          time={'18:30 - 20:00'}
          location={'Auditório - ISEP'}
          speakers={[]}
        />
      </div>
      <div className="col-start-1 row-start-4">
        <EventCard
          title={'Convívio e Churrasco'}
          type={'night'}
          time={'20:00 - 23:00'}
          location={'aeISEP'}
          speakers={[]}
        />
      </div>
      <div className="col-start-1 row-start-5">
        <EventCard
          title={'Snap Shots'}
          type={'night'}
          time={'23:00 - 4:00'}
          location={'aeISEP'}
          speakers={[]}
        />
      </div>
    </div>
  )
}
