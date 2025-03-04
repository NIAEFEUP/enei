import { Calendar, Clock, MapPin, Ticket, Users, Info, ClipboardCheck } from "@enei/shadcn/icons";
import { Button } from "@enei/shadcn/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@enei/shadcn/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@enei/shadcn/ui/card";
import { Separator } from "@enei/shadcn/ui/separator";
import BaseLayout from "#layouts/base";

export default function EventRegistrationPage() {
  const title = "Cybersecurity & Password Cracking";
  const description =
    "Uma exploração profunda sobre técnicas de cibersegurança e como os hackers conseguem aceder a passwords. Vamos explorar as técnicas mais comuns e como as podemos prevenir.";
  const date = "2025-03-03";
  const time = "14:00 - 15:30";
  const location = "B107 - FEUP";
  const speakers = [
    {
      name: "Dr. Mike Pound",
      role: "Pesquisador na Universidade de Nottingham, Inglaterra",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY5VZfZYg8fK226K1rD3uGZgKFyA59EkXify-5sPm9Eihp7K11As_fxdM&usqp=CAE&s",
    },
  ];
  const registrationRequirements = "Nada";
  const ticketsRemaining = 10;

  return (
    <BaseLayout title="Registo de Evento" className="bg-enei-beige">
      <div className="mt-10 flex justify-center">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            {/* Title and important information (date, time, location) */}
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
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
          </CardHeader>
          <Separator />
          <CardContent className="mt-2 space-y-2">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Info className="h-5 w-5" />
              <h1 className="text-lg font-semibold">Acerca do Evento</h1>
            </h2>
            <CardDescription>{description}</CardDescription>

            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Users className="h-5 w-5" />
              <h1 className="text-lg font-semibold">
                {speakers.length === 1 ? "Orador" : "Oradores"}
              </h1>
            </h2>
            <div className="grid gap-4">
              {speakers.map((speaker) => (
                <div key={speaker.name} className="flex items-center gap-4 rounded-lg border p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={speaker.image} alt={speaker.name} />
                    <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{speaker.name}</h3>
                    {speaker.role && (
                      <p className="text-muted-foreground text-sm">{speaker.role}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <ClipboardCheck className="h-5 w-5" />
              <h1 className="text-lg font-semibold">Requisitos de Inscrição</h1>
            </h2>
            <CardDescription>{registrationRequirements}</CardDescription>
            <Button onClick={() => console.log("Hello!")} className="w-full">
              Inscrever
            </Button>
            <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
              <Ticket className="h-4 w-4" />
              <span>{ticketsRemaining} lugares disponíveis</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
}
