'use client'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { InferPageProps } from '@adonisjs/inertia/types'
import OrdersController from '#controllers/orders_controller'
import Page from '~/components/common/page'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription } from '~/components/ui/alert'
import { Subscription, Transmit } from '@adonisjs/transmit-client'

interface Order {
  id: number
  requestId: string
  userId: number
  nif: number
  address: string
  status: string
  total: number
  createdAt: string
  updatedAt: string
}

async function registerSubscription(subscription: Subscription, orderId: number) {
  return await subscription.create().then(() => {
    console.log(`Subscribed to order/${orderId}`)
  })
}

export default function TicketSalePage(props: InferPageProps<OrdersController, 'show'> & { order: Order }) {
  const { order } = props
  const [timeLeft, setTimeLeft] = useState(() => {
    const orderDate = new Date(order.createdAt)
    const expirationDate = new Date(orderDate.getTime() + 4 * 60 * 1000)
    const now = new Date()
    const remainingMs = expirationDate.getTime() - now.getTime()
    return Math.max(0, Math.floor(remainingMs / 1000))
  })
  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: window.location.origin,
    })

    transmit.on('connected', (event) => {
      console.log('connected', event)
    })

    transmit.on('disconnected', () => {
      console.log('disconnected')
    })

    const subscription = transmit.subscription(`order/${order.id}`)
    registerSubscription(subscription, order.id)

    subscription.onMessage((data: { status: string }) => {
      console.log('Received message:', data)
    })

    if (order.status !== 'Pending') return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)


    return () => {
      transmit.close();
      clearInterval(timer);
    }
  }, [order.status])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Page title="Detalhes de Compra" className="bg-enei-blue">
    <div className="flex my-auto items-center justify-center mx-5">
      <Card className="w-full max-w-2xl m-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Detalhes de compra</CardTitle>
        </CardHeader>
        <CardContent>
            {order.status === 'Pending' && timeLeft > 0 && (
              <div className="mb-6 text-center space-y-4">
                <p className="text-yellow-800">
                  Tens de completar o pagamento dentro do prazo apresentado, caso contrário, este será automaticamente cancelado.
                </p>
                <div className={`text-6xl font-bold ${timeLeft <= 10 ? 'text-red-500' : timeLeft <= 30 ? 'text-yellow-500' : ''}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            )}
            {order.status === 'Success' && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  O teu pagamento foi processado com sucesso. Diverte-te!
                </AlertDescription>
              </Alert>
            )}
            {order.status === 'Failure' && (
              <Alert className="mb-4 bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">
                  O pagamento falhou. Por favor tenta novamente, seguindo estas instruções:
                  <ul className="mt-4 list-disc list-decimal list-inside">
                    <li>Tenta</li>
                    <li>Outra</li>
                    <li>Vez</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            <ul className="space-y-4">
              <li>
                <strong>ID da compra:</strong> {order.id}
              </li>
              {order.nif !== null && (
                <li>
                  <strong>NIF:</strong> {order.nif}
                </li>
              )}
              {order.address !== null && (
                <li>
                  <strong>Morada:</strong> {order.address}
                </li>
              )}
              <li>
                <strong>Estado:</strong> {order.status}
              </li>
              <li>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </li>
              <li>
                <strong>Criado:</strong> {new Date(order.createdAt).toLocaleString()}
              </li>
            </ul>
        </CardContent>
      </Card>
    </div>
    </Page>
  )
}
