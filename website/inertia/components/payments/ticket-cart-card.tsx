import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card'

interface TicketCartCardProps {
  title: string
  description: string
  price: number
}

export const TicketCartCard: React.FC<TicketCartCardProps> = ({ title, description, price }) => {
  return (
    // for small screens, limit the max width, otherwise, use the full width
    <Card>
      <CardContent className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-8">
          <img src="/favicon.svg" alt="Item" className="w-16 h-16 sm:block hidden" />
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <strong className="text-lg">{price}€</strong>
        </div>
      </CardContent>
    </Card>
  )
}
