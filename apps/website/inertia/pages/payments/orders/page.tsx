import BaseLayout from '~/layouts/base'
import OrderInfoDialog from '~/components/payments/order_info_dialog'
import Product from '#models/product'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

export interface Order {
  id: number
  requestId: string
  userId: number
  nif: number
  address: string
  status: string
  total: number
  createdAt: string
  updatedAt: string
  products: Product[]
}

export default function Payments({
  orders,
}:  { orders: Order[] }) {

  return (
    <BaseLayout
      title="Orders"
      className="text-enei-beige"
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
        <div className="overflow-x-auto">
          <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Código de Request</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.requestId}</TableCell>
          <TableCell>{order.status}</TableCell>
          <TableCell>{order.total != null ? order.total.toFixed(2) : '0.00'} € </TableCell>
          <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
          <TableCell className="flex items-center space-x-2">
            <OrderInfoDialog order={order} />
          </TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </div>
      </div>
    </BaseLayout>
  )
}
