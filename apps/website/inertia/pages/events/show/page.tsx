import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
  Info,
  ClipboardCheck,
  Loader2,
  QrCode,
} from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import Page from "~/components/common/page";
import { useForm } from "@inertiajs/react";
import Container from "~/components/common/containers";
import PaidRegistrationConfirmationModal from "~/components/events/confirmation_modal/paid_registration_confirmation_modal";
import PointsRegistrationConfirmationModal from "~/components/events/confirmation_modal/points_registration_confirmation_modal";
import { InferPageProps } from "@adonisjs/inertia/types";
import type EventsController from "#controllers/events_controller";
import EventCheckInDialog from "~/components/events/event_check_in_dialog";
import { useAuth } from "~/hooks/use_auth";
import { useToast } from "~/hooks/use_toast";
import RegistrationConfirmationModal from "~/components/events/confirmation_modal/registration_confirmation_modal";

interface Speaker {
  firstName: string;
  lastName: string;
  jobTitle: string;
  profilePicture: string;
  company: string;
}

interface EventRegistrationProps {
  eventId: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  type: "talk" | "workshop" | "night" | "meal" | "competition" | "networking" | "other";
  companyImage: string;
  speakers: Speaker[];
  extraInfo?: string;
  registrationRequirements: string;
  requiresRegistration: boolean;
  ticketsRemaining: number;
  price: number;
  isAcceptingRegistrations: boolean;
  isRegistered: boolean;
}

export default function EventRegistrationPage({
  event,
  formattedDate,
  formattedTime,
  price,
  isRegistered,
}: InferPageProps<EventsController, "show">) {
  const [registrationConfirmationModalOpen, setRegistrationConfirmationModalOpen] = useState(false);

  const [scannerModalOpen, setScannerModalOpen] = useState(false);

  const { toast } = useToast();

  const auth = useAuth();

  const { post, processing } = useForm({});

  const handleRegister = () => {
    post(`/events/${event.id}/register`, {
      onSuccess: () => {
        setRegistrationConfirmationModalOpen(false);
        toast({
          title: "Sucesso",
          description: "Estás inscrito. Diverte-te!",
        });
      },
      onError: (errors) => {
        toast({
          title: "Erro ao registar",
          description:
            errors.message
            || "Ocorreu um erro ao registar para o evento. Por favor, tenta novamente.",
          duration: 5000,
        });
      },
    });
  };

  const handleRegisterClick = () => {
    setRegistrationConfirmationModalOpen(true);
  };

  const activityClassesPrimary = {
    workshop: "border-enei-workshop",
    other: "border-enei-other",
    night: "border-enei-blue",
    talk: "border-enei-blue",
    networking: "border-enei-blue",
    competition: "border-enei-blue",
    meal: "border-enei-blue",
  };

  const activityColors = {
    workshop: "#5A8C86",
    other: "#E28C40",
    night: "#000000",
    talk: "#000000",
    networking: "#000000",
    competition: "#000000",
    meal: "#000000",
  };

  return (
    <Page title="Registo de Evento" className="bg-enei-beige" variant="beige">
      <Container>
        <div className="relative z-10 mt-10 flex justify-center">
          <Card className="mx-auto w-full max-w-7xl border-transparent bg-transparent shadow-transparent">
            <CardHeader>
              {/* Title and important information (date, time, location) */}
              <div className="flex flex-row justify-between">
                <div>
                  <CardTitle
                    className="text-2xl font-bold"
                    style={{ color: activityColors[event.type] }}
                  >
                    {event.title}
                  </CardTitle>
                  <div className="text-muted-foreground mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formattedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                {event.companyImage && (
                  <img
                    src={event.companyImage}
                    alt="Company Logo"
                    className="max-h-16 w-auto object-contain"
                  />
                )}
              </div>
            </CardHeader>
            {/* Event Description */}

            <CardContent className="mt-2 space-y-4" style={{ color: activityColors[event.type] }}>
              {event.description && (
                <div>
                  <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <Info className="h-5 w-5" />
                    <p className="text-lg font-semibold">Acerca do Evento</p>
                  </h1>
                  <div
                    className={cn(
                      "[&_a]:focus-visible:ring-ring [&_a]:text-primary space-y-2 text-black [&_a]:inline-flex [&_a]:h-auto [&_a]:items-center [&_a]:justify-center [&_a]:gap-2 [&_a]:whitespace-nowrap [&_a]:text-wrap [&_a]:rounded-md [&_a]:p-0 [&_a]:pl-1 [&_a]:text-sm [&_a]:font-medium [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:underline [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-1 [&_a]:disabled:pointer-events-none [&_a]:disabled:opacity-50 [&_li]:text-sm [&_p]:max-w-[70ch] [&_a]:[&_svg]:pointer-events-none [&_a]:[&_svg]:size-4 [&_a]:[&_svg]:shrink-0 [&_ul]:flex [&_ul]:list-inside [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2",
                    )}
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
              )}
              {/* {isRegistered && (
                <div className="flex flex-col pb-4">
                  <h2 className="text-md mb-2 font-semibold">
                    Informação complementar para participantes
                  </h2>
                  <ul className="flex list-inside list-disc flex-col gap-2">
                    <li className="text-sm">
                      Organização de Github:{" "}
                      <a
                        href="https://github.com/ENEI-Competicoes"
                        className={cn(buttonVariants({ variant: "link" }), "h-auto p-0 pl-1")}
                      >
                        https://github.com/ENEI-Competicoes
                      </a>
                    </li>
                    <li className="text-sm">
                      Grupo de WhatsApp para avisos:{" "}
                      <a
                        href="https://chat.whatsapp.com/Kea4ya7tEyl5FELOiQmdWf"
                        className={cn(buttonVariants({ variant: "link" }), "h-auto p-0 pl-1")}
                      >
                        https://chat.whatsapp.com/Kea4ya7tEyl5FELOiQmdWf
                      </a>
                    </li>
                    <li className="text-sm">
                      Grupo de WhatsApp para a competição:{" "}
                      <a
                        href="https://chat.whatsapp.com/GQckBEHqETVHqnVp7XFhO8"
                        className={cn(buttonVariants({ variant: "link" }), "h-auto p-0 pl-1")}
                      >
                        https://chat.whatsapp.com/GQckBEHqETVHqnVp7XFhO8
                      </a>
                    </li>
                  </ul>
                </div>
              )} */}
              {/* Speakers (if applicable) */}
              {event.speakers.length > 0 && (
                <div>
                  <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <Users className="h-5 w-5" />
                    <p className="text-lg font-semibold">
                      {event.speakers.length === 1 ? "Orador" : "Oradores"}
                    </p>
                  </h1>
                  <div className="flex flex-wrap gap-4">
                    {event.speakers.map((speaker) => (
                      <div
                        key={speaker.firstName + speaker.lastName}
                        className={cn(
                          "flex w-auto items-center gap-4 rounded-lg border p-4",
                          activityClassesPrimary[event.type],
                        )}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={speaker.profilePicture}
                            alt={speaker.firstName}
                            className="object-cover"
                          />
                          <AvatarFallback>{speaker.firstName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-medium">
                            {speaker.firstName + " " + speaker.lastName}
                          </h3>
                          <div className="flex flex-row">
                            {speaker.jobTitle && (
                              <p className="text-sm text-black">{speaker.jobTitle}</p>
                            )}
                            {speaker.company && (
                              <p className="text-sm text-black">{", " + speaker.company}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>{" "}
                </div>
              )}
              {/* Registration Requirements (if applicable) */}
              {event.registrationRequirements && (
                <>
                  <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <ClipboardCheck className="h-5 w-5" />
                    <p className="text-lg font-semibold">Requisitos de Inscrição</p>
                  </h1>
                  <p className="text-black">{event.registrationRequirements}</p>
                </>
              )}
              {/* Extra Information */}
              {event.extraInfo && isRegistered && (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <Info className="h-5 w-5" />
                    <p className="text-lg font-semibold">
                      Informação complementar para participantes
                    </p>
                  </h2>
                  <div dangerouslySetInnerHTML={{ __html: event.extraInfo }} />
                </div>
              )}
              {/* Price Display */}
              {price > 0 && (
                <div className="flex items-center justify-center gap-2 py-2 text-lg font-medium">
                  <span>{price}€</span>
                </div>
              )}
              {/* Button to register */}
              {!isRegistered && (
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => handleRegisterClick()}
                    disabled={
                      event.ticketsRemaining <= 0
                      || !event.requiresRegistration
                      || !event.isAcceptingRegistrations
                      || processing
                    }
                    className="px-4"
                    style={{ backgroundColor: activityColors[event.type] }}
                  >
                    {processing && <Loader2 className="animate-spin" />}
                    {event.requiresRegistration
                      ? event.ticketsRemaining > 0
                        ? price > 0
                          ? "Comprar"
                          : "Inscrever"
                        : "Esgotado"
                      : "Inscrição não necessária"}
                  </Button>

                  {auth.state === "authenticated" && auth.user.role === "staff" && (
                    <QrCode onClick={() => setScannerModalOpen(true)} />
                  )}
                </div>
              )}
              {/* Temporary indication that registration is not possible yet */}
              {/* <div className="flex justify-center">
                <Button
                  disabled={true}
                  className="px-4"
                  style={{ backgroundColor: activityColors[type] }}
                >
                  Ainda não é possível inscrever
                </Button>
              </div> */}
              {/* Indicator if the user is registered */}
              {isRegistered && (
                <div className="flex justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span
                          className={cn(
                            buttonVariants({ variant: "default" }),
                            "px-4 aria-disabled:pointer-events-none aria-disabled:opacity-50",
                          )}
                          style={{ backgroundColor: activityColors[event.type] }}
                          aria-disabled={processing || isRegistered}
                        >
                          {processing && <Loader2 className="animate-spin" />}
                          Inscrito
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-[30ch]">
                          <p>Para cancelar a tua inscrição, deves enviar um email para</p>
                          <a
                            className={cn(
                              buttonVariants({ variant: "link" }),
                              "text-enei-beige inline p-0 text-xs",
                            )}
                            href="mailto:geral@eneiconf.pt"
                          >
                            geral@eneiconf.pt
                          </a>
                          .
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              {/* Seats Available (the empty element is a weird fix...) */}
              {event.requiresRegistration ? (
                <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                  <Ticket className="h-4 w-4" />
                  <span>
                    {event.isAcceptingRegistrations ? (
                      <>{event.ticketsRemaining} lugares disponíveis</>
                    ) : (
                      <>De momento, não estamos a aceitar inscrições</>
                    )}
                  </span>
                </div>
              ) : (
                <></>
              )}
              <RegistrationConfirmationModal
                isOpen={registrationConfirmationModalOpen}
                isLoading={processing}
                onClose={() => setRegistrationConfirmationModalOpen(false)}
                onSubmit={handleRegister}
              />
              {auth.state === "authenticated" && auth.user.role === "staff" && (
                <EventCheckInDialog
                  isOpen={scannerModalOpen}
                  setOpen={setScannerModalOpen}
                  eventID={event.id}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Page>
  );
}
