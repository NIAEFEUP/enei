'use client'
import { InferPageProps } from '@adonisjs/inertia/types'
import OrdersController from '#controllers/orders_controller'
import BaseLayout from '~/layouts/base'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

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

export default function Payments({
  orders,
}: InferPageProps<OrdersController,'index'> & { orders: Order[] }) {
  return (
    <BaseLayout
      title="Orders"
      className="text-enei-beige"
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Request ID</TableHead>
                <TableHead>NIF</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.requestId}</TableCell>
                  <TableCell>{order.nif}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>${order.total != null ? order.total.toFixed(2) : '0.00'}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </BaseLayout>
  );
}
