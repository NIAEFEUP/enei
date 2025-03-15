import { Card, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Ticket } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

interface Speaker {
  firstName: string
  lastName: string
  profilePicture: string
}

interface EventCardProps {
  title: string
  type: string
  time: string
  location: string
  isRegistered: boolean
  speakers: Speaker[]
  onClick?: () => void
}

export default function EventCard({
  title,
  type,
  time,
  location,
  isRegistered,
  speakers,
  onClick,
}: EventCardProps) {
  return (
    <div onClick={onClick} className="hover:cursor-pointer">
      <Card className="bg-enei-blue p-3 space-y-3 w-full">
        <CardTitle className="text-enei-beige text-xl">{title}</CardTitle>
        <div className="flex flex-row gap-3">
          <Badge className="bg-enei-beige text-enei-blue pointer-events-none">{type}</Badge>
          {/* Display a badge if the user is registered in the event*/}
          {isRegistered && (
            <Badge className="bg-enei-beige text-enei-blue gap-2 pointer-events-none">
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
                  <AvatarImage src={speaker.profilePicture} alt={speaker.firstName}></AvatarImage>
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
