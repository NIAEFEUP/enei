import { Calendar, Clock, MapPin, Ticket, Users, Info, ClipboardCheck, Loader2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import BaseLayout from '~/layouts/base'
import { useState } from 'react'
import axios from 'axios'
import { useToast } from '~/hooks/use_toast'

interface Speaker {
  firstName: string
  lastName: string
  image: string
  jobTitle: string
  company: string
}

interface EventRegistrationProps {
  eventId: number
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
  eventId,
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
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleRegister = async () => {
    setIsLoading(true)
    try {
      await axios.post('/events/' + eventId + '/register')
      setIsRegistered(true)
    } catch (error) {
      console.log(error)
      setIsRegistered(false)
      toast({
        title: 'Erro ao registar',
        description:
          error.response?.data?.message ||
          'Ocorreu um erro ao registar para o evento. Por favor, tente novamente.',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnregister = async () => {
    setIsLoading(true)
    try {
      // await registerForEvent()
      // timeout to simulate a request
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsRegistered(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsRegistered(false)
    }
  }

  return (
    <BaseLayout title="Registo de Evento" className="bg-enei-beige ">
      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-7xl mx-auto bg-transparent border-transparent shadow-transparent">
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

          {/* Event Description */}
          <CardContent className="space-y-2 mt-2">
            <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Info className="h-5 w-5" />
              <p className="text-lg font-semibold">Acerca do Evento</p>
            </h1>
            <p className="text-black">{description}</p>

            {/* Speakers (if applicable) */}
            {speakers.length > 0 && (
              <div>
                <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <Users className="h-5 w-5" />
                  <p className="text-lg font-semibold">
                    {speakers.length === 1 ? 'Orador' : 'Oradores'}
                  </p>
                </h1>
                <div className="flex flex-wrap gap-4">
                  {speakers.map((speaker) => (
                    <div
                      key={speaker.firstName + speaker.lastName}
                      className="flex items-center gap-4 rounded-lg border p-4 border-gray-400 w-auto"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={speaker.image} alt={speaker.firstName} />
                        <AvatarFallback>{speaker.firstName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium">{speaker.firstName + speaker.lastName}</h3>
                        {speaker.jobTitle && (
                          <p className="text-sm text-black">{speaker.jobTitle}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>{' '}
              </div>
            )}

            {/* Registration Requirements (if applicable) */}
            {registrationRequirements !== '' && (
              <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <ClipboardCheck className="h-5 w-5" />
                <p className="text-lg font-semibold">Requisitos de Inscrição</p>
              </h1>
            )}
            <p className="text-black">{registrationRequirements}</p>

            {/* Price Display */}
            {price > 0 && (
              <div className="flex items-center justify-center gap-2 py-2 text-lg font-medium">
                <span>{price.toFixed(2)}€</span>
              </div>
            )}

            {/* Button to register */}

            {!isRegistered && (
              <div className="flex justify-center">
                <Button
                  onClick={() => handleRegister()}
                  disabled={ticketsRemaining <= 0 || !requiresRegistration || isLoading}
                  className="px-4"
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  {requiresRegistration
                    ? ticketsRemaining > 0
                      ? price > 0
                        ? 'Comprar'
                        : 'Inscrever'
                      : 'Esgotado'
                    : 'Inscrição não necessária'}
                </Button>
              </div>
            )}

            {/* Button to unregister */}
            {isRegistered && (
              <div className="flex justify-center">
                <Button onClick={() => handleUnregister()} disabled={isLoading} className="px-4">
                  {isLoading && <Loader2 className="animate-spin" />}
                  Cancelar Inscrição
                </Button>
              </div>
            )}

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
