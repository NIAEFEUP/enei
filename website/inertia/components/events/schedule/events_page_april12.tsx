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

export default function EventsPageApril12({ events }: EventsPageProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-12 gap-4">
      <div>
        <EventCard
          id={events[5].id}
          title={events[5].title}
          type={events[5].type}
          time={events[5].time}
          location={events[5].location}
          speakers={events[5].speakers}
          onClick={() => router.visit(`/events/${events[5].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-2">
        <EventCard
          id={events[1].id}
          title={events[1].title}
          type={events[1].type}
          time={events[1].time}
          location={events[1].location}
          speakers={events[1].speakers}
          onClick={() => router.visit(`/events/${events[1].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-3">
        <EventCard
          id={events[4].id}
          title={events[4].title}
          type={events[4].type}
          time={events[4].time}
          location={events[4].location}
          speakers={events[4].speakers}
          onClick={() => router.visit(`/events/${events[4].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-2 row-start-1">
        <EventCard
          id={events[0].id}
          title={events[0].title}
          type={events[0].type}
          time={events[0].time}
          location={events[0].location}
          speakers={events[0].speakers}
          onClick={() => router.visit(`/events/${events[0].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-3 row-start-1">
        <EventCard
          id={events[14].id}
          title={events[14].title}
          type={events[14].type}
          time={events[14].time}
          location={events[14].location}
          speakers={events[14].speakers}
          onClick={() => router.visit(`/events/${events[14].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-4 row-start-1">
        <EventCard
          id={events[15].id}
          title={events[15].title}
          type={events[15].type}
          time={events[15].time}
          location={events[15].location}
          speakers={events[15].speakers}
          onClick={() => router.visit(`/events/${events[15].id}`)}
        />
      </div>
      <div className="col-span-4 row-start-4">
        <EventCard
          title={'Almoço'}
          type={'activity'}
          time={'12:00 - 14:00'}
          location={'Cantina de Engenharia - FEUP'}
          speakers={[]}
        />
      </div>
      <div className="row-start-5">
        <EventCard
          id={events[16].id}
          title={events[16].title}
          type={events[16].type}
          time={events[16].time}
          location={events[16].location}
          speakers={events[16].speakers}
          onClick={() => router.visit(`/events/${events[16].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-6">
        <EventCard
          id={events[9].id}
          title={events[9].title}
          type={events[9].type}
          time={events[9].time}
          location={events[9].location}
          speakers={events[9].speakers}
          onClick={() => router.visit(`/events/${events[9].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-7">
        <EventCard
          id={events[6].id}
          title={events[6].title}
          type={events[6].type}
          time={events[6].time}
          location={events[6].location}
          speakers={events[6].speakers}
          onClick={() => router.visit(`/events/${events[6].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-2 row-start-5">
        <EventCard
          id={events[10].id}
          title={events[10].title}
          type={events[10].type}
          time={events[10].time}
          location={events[10].location}
          speakers={events[10].speakers}
          onClick={() => router.visit(`/events/${events[10].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-3 row-start-5">
        <EventCard
          id={events[7].id}
          title={events[7].title}
          type={events[7].type}
          time={events[7].time}
          location={events[7].location}
          speakers={events[7].speakers}
          onClick={() => router.visit(`/events/${events[7].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-4 row-start-5">
        <EventCard
          id={events[11].id}
          title={events[11].title}
          type={events[11].type}
          time={events[11].time}
          location={events[11].location}
          speakers={events[11].speakers}
          onClick={() => router.visit(`/events/${events[11].id}`)}
        />
      </div>
      <div className="col-span-4 row-start-8">
        <EventCard
          title={'Coffee Break'}
          type={'activity'}
          time={'16:00 - 16:30'}
          location={'Coffee Lounge - FEUP'}
          speakers={[]}
        />
      </div>
      <div className="row-start-9">
        <EventCard
          id={events[3].id}
          title={events[3].title}
          type={events[3].type}
          time={events[3].time}
          location={events[3].location}
          speakers={events[3].speakers}
          onClick={() => router.visit(`/events/${events[3].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-10">
        <EventCard
          id={events[2].id}
          title={events[2].title}
          type={events[2].type}
          time={events[2].time}
          location={events[2].location}
          speakers={events[2].speakers}
          onClick={() => router.visit(`/events/${events[2].id}`)}
        />
      </div>
      <div className="col-start-1 row-start-11">
        <EventCard
          id={events[8].id}
          title={events[8].title}
          type={events[8].type}
          time={events[8].time}
          location={events[8].location}
          speakers={events[8].speakers}
          onClick={() => router.visit(`/events/${events[8].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-2 row-start-9">
        <EventCard
          id={events[12].id}
          title={events[12].title}
          type={events[12].type}
          time={events[12].time}
          location={events[12].location}
          speakers={events[12].speakers}
          onClick={() => router.visit(`/events/${events[12].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-3 row-start-9">
        <EventCard
          id={events[13].id}
          title={events[13].title}
          type={events[13].type}
          time={events[13].time}
          location={events[13].location}
          speakers={events[13].speakers}
          onClick={() => router.visit(`/events/${events[13].id}`)}
        />
      </div>
      <div className="row-span-3 col-start-4 row-start-9">
        <EventCard
          id={events[17].id}
          title={events[17].title}
          type={events[17].type}
          time={events[17].time}
          location={events[17].location}
          speakers={events[17].speakers}
          onClick={() => router.visit(`/events/${events[17].id}`)}
        />
      </div>
      <div className="col-span-4 row-start-12">
        <EventCard
          title={'Jantar'}
          type={'activity'}
          time={'18:30 - 20:30'}
          location={'Cantina de Engenharia - FEUP'}
          speakers={[]}
        />
      </div>
    </div>
  )
}
