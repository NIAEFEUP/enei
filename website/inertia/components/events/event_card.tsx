import { Card, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Ticket } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { cn } from '~/lib/utils'
import { useEffect, useState } from 'react'

interface Speaker {
  firstName: string
  lastName: string
  profilePicture: string
}

interface EventCardProps {
  id?: number
  title: string
  type: 'activity' | 'workshop' | 'other'
  time: string
  location: string
  speakers: Speaker[]
  onClick?: () => void
}

export default function EventCard({
  id,
  title,
  type,
  time,
  location,
  speakers,
  onClick,
}: EventCardProps) {
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    async function fetchRegistrationStatus() {
      if (!id) return
      try {
        const response = await fetch(`/events/${id}/is-registered`)
        if (!response.ok) throw new Error('Failed to fetch registration status')
        const data = await response.json()
        setIsRegistered(data.isRegistered) // Update state}
      } catch (error) {
        console.error(error)
        setIsRegistered(false)
      }
    }
    fetchRegistrationStatus()
  })

  const cardBackground = {
    activity: 'bg-enei-activity',
    workshop: 'bg-enei-workshop',
    other: 'bg-enei-other',
  }

  const textColor = {
    activity: 'text-enei-activity',
    workshop: 'text-enei-workshop',
    other: 'text-enei-other',
  }

  const eventType = {
    activity: 'Atividade',
    workshop: 'Workshop',
    other: 'Talk',
  }

  return (
    <div onClick={onClick} className="hover:cursor-pointer h-full">
      <Card className={cn('p-3 space-y-3 w-full h-full ', cardBackground[type])}>
        <CardTitle className="text-enei-beige text-xl">{title}</CardTitle>
        <div className="flex flex-row gap-3">
          <Badge className={cn('bg-enei-beige pointer-events-none', textColor[type])}>
            {eventType[type]}
          </Badge>
          {/* Display a badge if the user is registered in the event*/}
          {isRegistered && (
            <Badge className={cn('bg-enei-beige gap-2 pointer-events-none', textColor[type])}>
              <Ticket className="h-4 w-4"></Ticket>
              <span>Vou</span>
            </Badge>
          )}
        </div>

        <div className="text-enei-beige flex flex-row gap-3">
          <p className="font-bold">{time}</p>
          <p>{location}</p>
        </div>

        {/* Display the speakers (if applicable) */}
        {speakers.length > 0 && (
          <div className="flex flex-col gap-3">
            {speakers.map((speaker, index) => (
              <div className="flex items-center gap-3 flex-row" key={index}>
                <Avatar>
                  <AvatarImage
                    src={speaker.profilePicture}
                    alt={speaker.firstName}
                    className="object-cover"
                  ></AvatarImage>
                  <AvatarFallback className="bg-enei-beige text-enei-blue">
                    {speaker.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-enei-beige">{speaker.firstName + ' ' + speaker.lastName}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
