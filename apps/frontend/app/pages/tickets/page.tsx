"use client";

import type { InferPageProps } from "@adonisjs/inertia/types";
import { Link } from "@tuyau/inertia/react";
import { Card, CardDescription, CardHeader, CardTitle } from "@enei/shadcn/ui/card";
import TicketsController from "#controllers/tickets_controller";
import Page from "#components/common/page";
import Container from "#components/common/containers/base";
import { cn } from "@enei/react-utils/cn";

export default function SelectTicketsPage(props: InferPageProps<TicketsController, "index">) {
  const imageSrc = `favicon.svg`;

  return (
    <Page title="Bilhetes" className="bg-enei-blue text-enei-beige">
      <Container>
        <h1 className="mb-6 text-center text-3xl font-bold">Seleciona o teu bilhete</h1>
        <p className="mb-8 text-center">
          Seleciona o teu bilhete e clica em comprar para continuar.
        </p>
        <div className="mx-auto grid w-full max-w-lg grid-cols-1 gap-6 md:max-w-xl">
          {props.ticketTypes.map((ticket) => {
            const card = (
              <Card
                className={cn(
                  "hover:shadow-lg",
                  ticket.outOfStock && "cursor-not-allowed select-none contrast-75 saturate-0",
                )}
              >
                <div className="flex items-center justify-between p-6">
                  <CardHeader>
                    <CardTitle>{ticket.name}</CardTitle>
                    <CardDescription className="whitespace-pre-wrap">
                      <div
                        className="text-sm text-gray-500"
                        dangerouslySetInnerHTML={{ __html: ticket.description }}
                      />
                    </CardDescription>
                    <p className="text-2xl font-bold">
                      <span className={cn(ticket.outOfStock && "line-through")}>
                        {ticket.price}€
                      </span>{" "}
                      {ticket.outOfStock && <span className="uppercase">Esgotado</span>}
                    </p>
                  </CardHeader>
                  <img className="hidden md:block" src={imageSrc} alt={ticket.name || undefined} />
                </div>
              </Card>
            );

            return ticket.outOfStock ? (
              <div key={ticket.id}>{card}</div>
            ) : (
              <Link route="checkout" params={{ id: ticket.id }} key={ticket.id}>
                {card}
              </Link>
            );
          })}
        </div>
      </Container>
    </Page>
  );
}
