'use client'

import Ticket from '#models/ticket'
import db from '@adonisjs/lucid/services/db'
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

const ticketTypes: Ticket[] = await db.from('tickets')

export default function SelectTicketsPage() {
  const imageSrc = `favicon.svg`

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6">Seleciona o teu bilhete</h1>
      <p className="text-center text-gray-600 mb-8">
        Seleciona o teu bilhete e clica em comprar para continuar.
      </p>

      <div className="grid gap-6 grid-cols-1 md:w-1/2">
        {ticketTypes.map((ticket) => (
          <a href={`/tickets/${ticket.id}/checkout`}>
            <Card className="hover:shadow-lg" key={ticket.id}>
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
          </a>
        ))}
      </div>
    </div>
  )
}
