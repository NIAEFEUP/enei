import { Card, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Ticket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { useState } from "react";

interface Speaker {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface EventCardProps {
  id?: number;
  title: string;
  type: "talk" | "workshop" | "night" | "meal" | "competition" | "networking" | "other";
  time: string;
  location: string;
  speakers: Speaker[];
  allowClick?: boolean;
  onClick?: () => void;
}

export default function EventCard({
  title,
  type,
  time,
  location,
  speakers,
  allowClick = false,
  onClick,
}: EventCardProps) {
  const [isRegistered] = useState(false);

  // useEffect(() => {
  //   async function fetchRegistrationStatus() {
  //     if (!id) return
  //     try {
  //       const response = await fetch(`/events/${id}/is-registered`)
  //       if (!response.ok) throw new Error('Failed to fetch registration status')
  //       const data = await response.json()
  //       setIsRegistered(data.isRegistered) // Update state}
  //     } catch (error) {
  //       console.error(error)
  //       setIsRegistered(false)
  //     }
  //   }
  //   fetchRegistrationStatus()
  // })

  const cardBackground = {
    talk: "bg-enei-talk",
    workshop: "bg-enei-workshop",
    night: "bg-enei-night",
    meal: "bg-enei-meal",
    competition: "bg-enei-competition",
    networking: "bg-enei-networking",
    other: "bg-enei-other",
  };

  const textColorBadge = {
    talk: "text-enei-blue",
    workshop: "text-enei-blue",
    night: "text-enei-blue",
    meal: "text-enei-blue",
    competition: "text-enei-blue",
    networking: "text-enei-blue",
    other: "text-enei-blue",
  };

  const badgeColor = {
    talk: "bg-enei-beige",
    workshop: "bg-enei-beige",
    night: "bg-enei-beige",
    meal: "bg-enei-beige",
    competition: "bg-enei-beige",
    networking: "bg-enei-beige",
    other: "bg-enei-beige",
  };

  const textColor = {
    talk: "text-enei-blue",
    workshop: "text-enei-blue",
    night: "text-enei-beige",
    meal: "text-enei-beige",
    competition: "text-enei-beige",
    networking: "text-enei-blue",
    other: "text-enei-beige",
  };

  const eventType = {
    talk: "Talk",
    workshop: "Workshop",
    night: "Atividade Noturna",
    meal: "Refeição",
    competition: "Competição",
    networking: "Networking",
    other: "Outro",
  };

  return (
    <div
      onClick={allowClick ? onClick : undefined}
      className={cn("h-full w-full", allowClick && "cursor-pointer")}
    >
      <Card className={cn("h-full w-full space-y-3 border-none p-3", cardBackground[type])}>
        <CardTitle className={cn("text-xl", textColor[type])}>{title}</CardTitle>
        <div className="flex flex-row gap-3">
          <Badge className={cn("pointer-events-none", textColorBadge[type], badgeColor[type])}>
            {eventType[type]}
          </Badge>
          {/* Display a badge if the user is registered in the event*/}
          {isRegistered && (
            <Badge
              className={cn("pointer-events-none gap-2", textColorBadge[type], badgeColor[type])}
            >
              <Ticket className="h-4 w-4"></Ticket>
              <span>Vou</span>
            </Badge>
          )}
        </div>

        <div className={cn("flex flex-col gap-3 lg:flex-wrap", textColor[type])}>
          <p className="font-bold">{time}</p>
          <p>{location}</p>
        </div>

        {/* Display the speakers (if applicable) */}
        {speakers.length > 0 && (
          <div className="flex flex-col gap-3">
            {speakers.map((speaker, index) => (
              <div className="flex flex-row items-center gap-3" key={index}>
                <Avatar>
                  <AvatarImage
                    src={speaker.profilePicture}
                    alt={speaker.firstName}
                    className="object-cover"
                  ></AvatarImage>
                  <AvatarFallback className={cn("bg-enei-beige", textColor[type])}>
                    {speaker.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className={cn("", textColor[type])}>
                  {speaker.firstName + " " + speaker.lastName}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
