// import EventCard from '../event_card'
// import { router } from '@inertiajs/react'

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
  return <h1>Horário de dia 11 ainda por definir</h1>
}
