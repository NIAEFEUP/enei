'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { InferPageProps } from '@adonisjs/inertia/types'
import OrdersController from '#controllers/orders_controller'

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

export default function TicketSalePage(props: InferPageProps<OrdersController, 'show'> & { order: Order }) {
  const { order } = props

  return (
    <div className="min-h-screen flex items-center justify-center m-5">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Information about your order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Order ID:</strong> {order.id}
            </div>
            {order.nif !== null && (
                <div>
                    <strong>NIF:</strong> {order.nif}
                </div>
            )}
            {order.address !== null &&  <div>
              <strong>Address:</strong> {order.address}
            </div>}
           
            <div>
              <strong>Status:</strong> {order.status}
            </div>
            <div>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </div>
            <div>
              <strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
