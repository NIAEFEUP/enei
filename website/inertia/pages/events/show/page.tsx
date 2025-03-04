import { Calendar, Clock, MapPin, Ticket, Users, Info, ClipboardCheck } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import BaseLayout from '~/layouts/base'

interface Speaker {
  firstName: string
  lastName: string
  image: string
  jobTitle: string
  company: string
}

interface EventRegistrationProps {
  title: string
  description: string
  date: string
  time: string
  location: string
  speakers: Speaker[]
  registrationRequirements: string
  requiresRegistration: boolean
  ticketsRemaining: number
  price: number
}

export default function EventRegistrationPage({
  title,
  description,
  date,
  time,
  location,
  speakers,
  registrationRequirements,
  requiresRegistration,
  ticketsRemaining,
  price,
}: EventRegistrationProps) {


  return (
    <BaseLayout title="Registo de Evento" className="bg-enei-beige ">
      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            {/* Title and important information (date, time, location) */}
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <div className="mt-4 flex flex-col gap-2 text-muted-foreground sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            </div>
          </CardHeader>
          <Separator />

          {/* Event Description */}
          <CardContent className="space-y-2 mt-2">
            <div className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Info className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Acerca do Evento</h2>
            </div>
            <CardDescription>{description}</CardDescription>

            {/* Speakers */}
            <div className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Users className="h-5 w-5" />
              <h2 className="text-lg font-semibold">
                {speakers.length === 1 ? 'Orador' : 'Oradores'}
              </h2>
            </div>

            <div className="grid gap-4">
              {speakers.map((speaker) => (
                <div key={speaker.firstName} className="flex items-center gap-4 rounded-lg border p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={speaker.image} alt={speaker.firstName} />
                    <AvatarFallback>{speaker.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{speaker.firstName}</h3>
                    {speaker.jobTitle && (
                      <p className="text-sm text-muted-foreground">{speaker.jobTitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Registration Requirements (if applicable) */}
            {registrationRequirements !== '' && (
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <ClipboardCheck className="h-5 w-5" />
                <h1 className="text-lg font-semibold">Requisitos de Inscrição</h1>
              </h2>
            )}
            <CardDescription>{registrationRequirements}</CardDescription>

            {/* Price Display */}
            {price > 0 && (
              <div className="flex items-center justify-center gap-2 py-2 text-lg font-medium">
                <span>{price.toFixed(2)}€</span>
              </div>
            )}

            {/* Button to buy */}
            <Button
              onClick={() => console.log('Hello!')}
              disabled={ticketsRemaining <= 0 || !requiresRegistration}
              className="w-full"
            >
              {requiresRegistration
                ? ticketsRemaining > 0
                  ? price > 0
                    ? 'Comprar'
                    : 'Inscrever'
                  : 'Esgotado'
                : 'Inscrição não necessária'}
            </Button>

            {/* Seats Available */}
            {requiresRegistration && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Ticket className="h-4 w-4" />
                <span>{ticketsRemaining} lugares disponíveis</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  )
}
