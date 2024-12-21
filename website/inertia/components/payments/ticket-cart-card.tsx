import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '~/components/ui/card'

interface TicketCartCardProps {
  title: string
  description: string
  price: number
}

export const TicketCartCard: React.FC<TicketCartCardProps> = ({ title, description, price }) => {
  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Carrinho</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center space-x-8">
            <div className="flex items-center space-x-6">
              <img src="/favicon.svg" alt="Item" className="w-16 h-16" />
              <div className="space-y-2">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </div>
            <strong className="">{price}€</strong>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
