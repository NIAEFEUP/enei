import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
  Info,
  ClipboardCheck,
  Loader2,
} from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "~/hooks/use_toast";
import { cn } from "~/lib/utils";
// import { Tooltip } from '~/components/ui/tooltip'
// import { TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import RegistrationConfirmationModal from "~/components/events/registration_confirmation_modal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import Page from "~/components/common/page";
import { router } from "@inertiajs/react";
import Container from "~/components/common/containers";

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
  extraInfo,
  registrationRequirements,
  requiresRegistration,
  ticketsRemaining: initialTicketsRemaining,
  price,
  isAcceptingRegistrations,
}: EventRegistrationProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketsRemaining, setTicketsRemaining] = useState(initialTicketsRemaining);
  const [registrationConfirmationModalOpen, setRegistrationConfirmationModalOpen] = useState(false);

  const { toast } = useToast();

  const fetchTicketsRemaining = async () => {
    try {
      const response = await axios.get("/events/" + eventId + "/tickets");
      setTicketsRemaining(response.data.ticketsRemaining);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRegistrationStatus = async () => {
    try {
      const response = await axios.get("/events/" + eventId + "/is-registered");
      setIsRegistered(response.data.isRegistered);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchTicketsRemaining();
      await fetchRegistrationStatus();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleRegisterClick = () => {
    setRegistrationConfirmationModalOpen(true);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      router.post("/events/" + eventId + "/register", undefined, {
        onFinish: () => fetchRegistrationStatus(),
      });
    } catch (error) {
      console.error(error);
      if (error.response?.status === 302) {
        window.location.href = "/signup";
        return;
      }

      if (error.response?.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      toast({
        title: "Erro ao registar",
        description:
          error.response?.data?.message
          || "Ocorreu um erro ao registar para o evento. Por favor, tente novamente.",
        duration: 5000,
      });
    } finally {
      await fetchRegistrationStatus();
      await fetchTicketsRemaining();
      setIsLoading(false);
      setRegistrationConfirmationModalOpen(false);
    }
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
                  <CardTitle className="text-2xl font-bold" style={{ color: activityColors[type] }}>
                    {title}
                  </CardTitle>
                  <div className="text-muted-foreground mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
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

            <CardContent className="mt-2 space-y-4" style={{ color: activityColors[type] }}>
              {description && (
                <div>
                  <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <Info className="h-5 w-5" />
                    <p className="text-lg font-semibold">Acerca do Evento</p>
                  </h1>
                  <div className="space-y-2">
                    {description.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="max-w-[70ch] text-black">
                        {paragraph}
                      </p>
                    ))}
                  </div>
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
              {speakers.length > 0 && (
                <div>
                  <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <Users className="h-5 w-5" />
                    <p className="text-lg font-semibold">
                      {speakers.length === 1 ? "Orador" : "Oradores"}
                    </p>
                  </h1>
                  <div className="flex flex-wrap gap-4">
                    {speakers.map((speaker) => (
                      <div
                        key={speaker.firstName + speaker.lastName}
                        className={cn(
                          "flex w-auto items-center gap-4 rounded-lg border p-4",
                          activityClassesPrimary[type],
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
              {registrationRequirements && (
                <>
                  <h1 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <ClipboardCheck className="h-5 w-5" />
                    <p className="text-lg font-semibold">Requisitos de Inscrição</p>
                  </h1>
                  <p className="text-black">{registrationRequirements}</p>
                </>
              )}
              {/* Extra Information */}
              {extraInfo && isRegistered && (
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <Info className="h-5 w-5" />
                    <p className="text-lg font-semibold">
                      Informação complementar para participantes
                    </p>
                  </h2>
                  <div dangerouslySetInnerHTML={{ __html: extraInfo }} />
                </div>
              )}
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
                    disabled={
                      ticketsRemaining <= 0
                      || !requiresRegistration
                      || !isAcceptingRegistrations
                      || isLoading
                    }
                    className="px-4"
                    style={{ backgroundColor: activityColors[type] }}
                  >
                    {isLoading && <Loader2 className="animate-spin" />}
                    {requiresRegistration
                      ? ticketsRemaining > 0
                        ? price > 0
                          ? "Comprar"
                          : "Inscrever"
                        : "Esgotado"
                      : "Inscrição não necessária"}
                  </Button>
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
                          style={{ backgroundColor: activityColors[type] }}
                          aria-disabled={isLoading || isRegistered}
                        >
                          {isLoading && <Loader2 className="animate-spin" />}
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
              {requiresRegistration ? (
                <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                  <Ticket className="h-4 w-4" />
                  <span>
                    {isAcceptingRegistrations ? (
                      <>{ticketsRemaining} lugares disponíveis</>
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
                isLoading={isLoading}
                onClose={() => setRegistrationConfirmationModalOpen(false)}
                onSubmit={handleRegister}
              />
            </CardContent>
          </Card>
        </div>
      </Container>
    </Page>
  );
}
