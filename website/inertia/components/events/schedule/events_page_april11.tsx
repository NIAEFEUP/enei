import EventCard from '../event_card'

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
  events: Event[]
}

export default function EventsPageApril11({ events }: EventsPageProps) {
  console.log(events)
  return (
    <div className="flex flex-col spacae-y-4 md:grid md:grid-cols-1 md:grid-rows-4 md:gap-4 md:space-y-0">
      <div className="col-start-1 row-start-1 row-span-2">
        <EventCard
          title={'Boas-Vindas'}
          type={'activity'}
          time={'14:00 - 18:30'}
          location={'TBD - ISEP'}
          speakers={[]}
        />
      </div>
      <div className="col-start-1 row-start-3">
        <EventCard
          title={'Sessão de Abertura'}
          type={'activity'}
          time={'18:30 - 20:00'}
          location={'Auditório - ISEP'}
          speakers={[]}
        />
      </div>
      <div className="col-start-1 row-start-4">
        <EventCard
          title={'Convívio e Churrasco'}
          type={'activity'}
          time={'20:00 - 23:00'}
          location={'AEISEP'}
          speakers={[]}
        />
      </div>
    </div>
  )
}
