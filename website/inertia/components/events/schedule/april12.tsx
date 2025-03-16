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
  console.log(events)
  return (
    <div className="grid grid-cols-4 grid-rows-12 gap-4">
      <div>
        <EventCard
          title={events[6].title}
          type={events[6].type}
          time={events[6].time}
          location={events[6].location}
          isRegistered={false}
          speakers={events[6].speakers}
          onClick={() => router.visit('/events/12')}
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
          onClick={() => router.visit('/events/5')}
        />
      </div>
      <div className="col-start-1 row-start-3">
        <EventCard
          title={events[5].title}
          type={events[5].type}
          time={events[5].time}
          location={events[5].location}
          isRegistered={false}
          speakers={events[5].speakers}
          onClick={() => router.visit('/events/10')}
        />
      </div>
      <div className="row-span-3 col-start-2 row-start-1">
        <EventCard
          title={events[0].title}
          type={events[0].type}
          time={events[0].time}
          location={events[0].location}
          isRegistered={false}
          speakers={events[0].speakers}
          onClick={() => router.visit('/events/1')}
        />
      </div>
      <div className="row-span-3 col-start-3 row-start-1">
        <EventCard
          title={events[16].title}
          type={events[16].type}
          time={events[16].time}
          location={events[16].location}
          isRegistered={false}
          speakers={events[16].speakers}
          onClick={() => router.visit('/events/32')}
        />
      </div>
      <div className="row-span-3 col-start-4 row-start-1">
        <EventCard
          title={events[17].title}
          type={events[17].type}
          time={events[17].time}
          location={events[17].location}
          isRegistered={false}
          speakers={events[17].speakers}
          onClick={() => router.visit('/events/33')}
        />
      </div>
      <div className="col-span-4 row-start-4">
        <EventCard
          title={'Almoço'}
          type={'activity'}
          time={'12:00 - 14:00'}
          location={'Cantina da FEUP'}
          isRegistered={false}
          speakers={[]}
        />
      </div>
      <div className="row-start-5">8</div>
      <div className="col-start-1 row-start-6">9</div>
      <div className="col-start-1 row-start-7">10</div>
      <div className="row-span-3 col-start-2 row-start-5">11</div>
      <div className="row-span-3 col-start-3 row-start-5">12</div>
      <div className="row-span-3 col-start-4 row-start-5">13</div>
      <div className="col-span-4 row-start-8">14</div>
      <div className="row-start-9">15</div>
      <div className="col-start-1 row-start-10">16</div>
      <div className="col-start-1 row-start-11">17</div>
      <div className="row-span-3 col-start-2 row-start-9">18</div>
      <div className="row-span-3 col-start-3 row-start-9">19</div>
      <div className="row-span-3 col-start-4 row-start-9">20</div>
      <div className="col-span-4 row-start-12">21</div>
    </div>
  )
}
