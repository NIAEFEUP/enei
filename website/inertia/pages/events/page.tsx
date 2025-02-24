import { Calendar, Clock, MapPin, Ticket, Users, Info, ClipboardCheck } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import BaseLayout from '~/layouts/base'

export default function EventRegistrationPage() {
  const title = 'Workshop Prolog'
  const description = 'Workshop dado pela lenda sabio fa'
  const date = '2025-03-03'
  const time = '14:00 - 15:30'
  const location = 'B107 - FEUP'
  const speakers = ['Sabio Fa']
  const registrationRequirements = 'Nada'
  const ticketsRemaining = 10

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
          <CardContent className="space-y-2 mt-2">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Info className="h-5 w-5" />
              <h1 className="text-lg font-semibold">Acerca do Evento</h1>
            </h2>
            <CardDescription>{description}</CardDescription>

            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Users className="h-5 w-5" />
              <h1 className="text-lg font-semibold">Orador</h1>
            </h2>
            <ul className="list-inside list-disc text-muted-foreground">
              {speakers.map((speaker) => (
                <li key={speaker}>{speaker}</li>
              ))}
            </ul>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <ClipboardCheck className="h-5 w-5" />
              <h1 className="text-lg font-semibold">Requisitos de Inscrição</h1>
            </h2>
            <CardDescription>{registrationRequirements}</CardDescription>
            <Button onClick={() => console.log('Hello!')} className="w-full">
              Inscrever
            </Button>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Ticket className="h-4 w-4" />
              <span>{ticketsRemaining} lugares disponíveis</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  )
}
