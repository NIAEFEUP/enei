import { Calendar, Clock, MapPin, Ticket, Users, Info, ClipboardCheck, Loader2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import BaseLayout from '~/layouts/base'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useToast } from '~/hooks/use_toast'
import { cn } from '~/lib/utils'
import { Tooltip } from '~/components/ui/tooltip'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import RegistrationConfirmationModal from '~/components/events/registration_confirmation_modal'

interface Speaker {
  firstName: string
  lastName: string
  jobTitle: string
  profilePicture: string
  company: string
}

interface EventRegistrationProps {
  eventId: number
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'activity' | 'workshop' | 'other'
  companyImage: string
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
  type,
  companyImage,
  speakers,
  registrationRequirements,
  requiresRegistration,
  ticketsRemaining: initialTicketsRemaining,
  price,
}: EventRegistrationProps) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [ticketsRemaining, setTicketsRemaining] = useState(initialTicketsRemaining)
  const [registrationConfirmationModalOpen, setRegistrationConfirmationModalOpen] = useState(false)

  const { toast } = useToast()

  const fetchTicketsRemaining = async () => {
    try {
      const response = await axios.get('/events/' + eventId + '/tickets')
      console.log(response)
      setTicketsRemaining(response.data.ticketsRemaining)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRegistrationStatus = async () => {
    try {
      const response = await axios.get('/events/' + eventId + '/is-registered')
      setIsRegistered(response.data.isRegistered)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await fetchTicketsRemaining()
      await fetchRegistrationStatus()
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleRegisterClick = () => {
    setRegistrationConfirmationModalOpen(true)
  }

  const handleRegister = async () => {
    setIsLoading(true)
    try {
      await axios.post('/events/' + eventId + '/register')
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = '/auth/login'
        return
      }
      toast({
        title: 'Erro ao registar',
        description:
          error.response?.data?.message ||
          'Ocorreu um erro ao registar para o evento. Por favor, tente novamente.',
        duration: 5000,
      })
    } finally {
      await fetchRegistrationStatus()
      await fetchTicketsRemaining()
      setIsLoading(false)
      setRegistrationConfirmationModalOpen(false)
    }
  }

  const activityClassesPrimary = {
    activity: 'border-enei-activity',
    workshop: 'border-enei-workshop',
    other: 'border-enei-other',
  }

  const activityColors = {
    activity: '#5A8C86',
    workshop: '#E28C40',
    other: '#E2AD50',
  }

  return (
    <BaseLayout
      title="Registo de Evento"
      className="bg-enei-beige with-decorative-bars"
      barColor={cn('', activityColors[type])}
    >
      <div className="flex justify-center mt-10 relative z-10">
        <Card className="w-full max-w-7xl mx-auto border-transparent shadow-transparent bg-transparent">
          <CardHeader>
            {/* Title and important information (date, time, location) */}
            <div className="flex flex-row justify-between">
              <div>
                <CardTitle className="text-2xl font-bold" style={{ color: activityColors[type] }}>
                  {title}
                </CardTitle>
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
              </div>
              {companyImage && (
                <img
                  src={companyImage}
                  alt="Company Logo"
                  className="max-h-16 w-auto object-contain"
                />
              )}
            </div>
          </CardHeader>

          {/* Event Description */}
          <CardContent className="space-y-2 mt-2" style={{ color: activityColors[type] }}>
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
                      className={cn(
                        'flex items-center gap-4 rounded-lg border p-4 w-auto',
                        activityClassesPrimary[type]
                      )}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={speaker.profilePicture} alt={speaker.firstName} />
                        <AvatarFallback>{speaker.firstName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium">
                          {speaker.firstName + ' ' + speaker.lastName}
                        </h3>
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
                  onClick={() => handleRegisterClick()}
                  disabled={ticketsRemaining <= 0 || !requiresRegistration || isLoading}
                  className="px-4"
                  style={{ backgroundColor: activityColors[type] }}
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

            {/* Indicator if the user is registered */}
            {isRegistered && (
              <div className="flex justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        disabled={isLoading || isRegistered}
                        className="px-4"
                        style={{ backgroundColor: activityColors[type] }}
                      >
                        {isLoading && <Loader2 className="animate-spin" />}
                        Inscrito
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Para cancelares a tua inscrição contacta </p>
                      <Button className="p-0" variant="link">
                        <a href="mailto:geral@eneiconf.pt">geral@eneiconf.pt</a>
                      </Button>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            {/* Seats Available */}
            {requiresRegistration && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Ticket className="h-4 w-4" />
                <span>{ticketsRemaining} lugares disponíveis</span>
              </div>
            )}
            <RegistrationConfirmationModal
              isOpen={registrationConfirmationModalOpen}
              isLoading={isLoading}
              onClose={() => setRegistrationConfirmationModalOpen(false)}
              onSubmit={handleRegister}
            />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  )
}
