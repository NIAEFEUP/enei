'use client'

import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@tuyau/inertia/react'
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import TicketsController from '#controllers/tickets_controller'
import Page from '~/components/common/page'
import Container from '~/components/common/containers'

export default function SelectTicketsPage(props: InferPageProps<TicketsController, 'index'>) {
  const imageSrc = `favicon.svg`

  return (
    <Page title="Bilhetes" className="bg-enei-blue text-enei-beige">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-6">Seleciona o teu bilhete</h1>
        <p className="text-center mb-8">
          Seleciona o teu bilhete e clica em comprar para continuar.
        </p>
        <div className="grid gap-6 grid-cols-1 mx-auto max-w-lg md:max-w-xl w-full">
          {props.ticketTypes.map((ticket) => (
            <Link route="pages:tickets.checkout" params={{ id: ticket.id }} key={ticket.id}>
              <Card className="hover:shadow-lg">
                <div className="flex items-center justify-between p-6">
                  <CardHeader>
                    <CardTitle>{ticket.name}</CardTitle>
                    <CardDescription className="whitespace-pre-wrap">
                      {ticket.description}
                    </CardDescription>
                    <p className="text-2xl font-bold">{ticket.price}€</p>
                  </CardHeader>
                  <img className="hidden md:block" src={imageSrc} alt={ticket.name || undefined} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Page>
  )
}
