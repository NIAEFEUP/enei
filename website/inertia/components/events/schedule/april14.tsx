import EventCard from '../event_card'
import { router } from '@inertiajs/react'

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

export default function EventsPageApril14({ events }: EventsPageProps) {
  console.log(events)
  return (
    <div className="grid grid-cols-4 grid-rows-9 gap-4">
      <div>
        <EventCard
          title={events[1].title}
          type={events[1].type}
          time={events[1].time}
          location={events[1].location}
          isRegistered={false}
          speakers={events[1].speakers}
          onClick={() => router.visit(`/events/${events[1].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-2">
        <EventCard
          title={events[2].title}
          type={events[2].type}
          time={events[2].time}
          location={events[2].location}
          isRegistered={false}
          speakers={events[2].speakers}
          onClick={() => router.visit(`/events/${events[2].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-3">
        <EventCard
          title={events[3].title}
          type={events[3].type}
          time={events[3].time}
          location={events[3].location}
          isRegistered={false}
          speakers={events[3].speakers}
          onClick={() => router.visit(`/events/${events[3].id}`)}
        />
      </div>

      <div className="col-start-1 row-start-4">
        <EventCard
          title={events[4].title}
          type={events[4].type}
          time={events[4].time}
          location={events[4].location}
          isRegistered={false}
          speakers={events[4].speakers}
          onClick={() => router.visit(`/events/${events[4].id}`)}
        />
      </div>
      <div className="row-span-4 col-start-2 row-start-1">
        <EventCard
          title={events[5].title}
          type={events[5].type}
          time={events[5].time}
          location={events[5].location}
          isRegistered={false}
          speakers={events[5].speakers}
          onClick={() => router.visit(`/events/${events[5].id}`)}
        />
      </div>
      <div className="row-span-4 col-start-3 row-start-1">
        <EventCard
          title={'Workshop TBD'}
          type={'workshop'}
          time={'9:30 - 11:30'}
          location={'TBD - FEUP'}
          isRegistered={false}
          speakers={[]}
        />
      </div>
      <div className="row-span-4 col-start-4 row-start-1">
        <EventCard
          title={'Workshop TBD'}
          type={'workshop'}
          time={'9:30 - 11:30'}
          location={'TBD - FEUP'}
          isRegistered={false}
          speakers={[]}
        />
      </div>
      <div className="col-span-4 row-start-5">
        <EventCard
          title={'Coffee Break'}
          type={'activity'}
          time={'11:30 - 12:00'}
          location={'Coffee Lounge - FEUP'}
          isRegistered={false}
          speakers={[]}
        />
      </div>
      <div className="row-start-6">
        <EventCard
          title={events[0].title}
          type={events[0].type}
          time={events[0].time}
          location={events[0].location}
          isRegistered={false}
          speakers={events[0].speakers}
          onClick={() => router.visit(`/events/${events[0].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-7">
        <EventCard
          title={'Painel de Empresas'}
          type={'other'}
          time={'12:30 - 13:30'}
          location={'Auditório - FEUP'}
          isRegistered={false}
          speakers={[]}
        />
      </div>
      <div className="row-span-2 col-start-2 row-start-6 col-span-3">
        <EventCard
          title={'Torneio de Bots de Sueca'}
          type={'activity'}
          time={'12:00 - 13:30'}
          location={'Auditório - FEUP'}
          isRegistered={false}
          speakers={[]}
        />
      </div>
      <div className="row-span-1 col-start-1 col-span-4 row-start-8">
        <EventCard
          title={'Almoço'}
          type={'activity'}
          time={'13:30 - 15:30'}
          location={'Relvado Central - FEUP'}
          isRegistered={false}
          speakers={[]}
        />
      </div>
      <div className="row-span-1 col-start-1 col-span-4 row-start-9">
        <EventCard
          title={'Sessão de Encerramento'}
          type={'activity'}
          time={'15:30 - 17:00'}
          location={'Auditório - FEUP'}
          isRegistered={false}
          speakers={[]}
        />
      </div>
    </div>
  )
}
