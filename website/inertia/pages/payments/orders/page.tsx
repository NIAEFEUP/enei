import { Button } from '~/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import BaseLayout from '~/layouts/base'
import OrderInfoDialog from '~/components/payments/order_info_dialog'
import Product from '#models/product'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { jsPDF } from 'jspdf'

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
  const generateInvoice = (order: Order) => {
    const doc = new jsPDF()
    
    doc.setFontSize(24)
    doc.setTextColor(0, 0, 0)
    doc.text('ENEI', 105, 20, { align: 'center' })
    
    doc.setFontSize(20)
    doc.text('Fatura', 105, 30, { align: 'center' })
    
    doc.setFontSize(12)
    doc.text(`Fatura #: ${order.id}`, 14, 45)
    doc.text(`Código do Pedido: ${order.requestId}`, 14, 52)
    doc.text(`Data de Emissão: ${new Date().toLocaleDateString()}`, 14, 59)
    doc.text(`Data da Compra: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 66)
    doc.text(`NIF: ${order.nif}`, 14, 73)
    doc.text(`Estado: ${order.status}`, 14, 80)
    doc.text(`Morada: ${order.address}`, 14, 87)

    doc.setDrawColor(0, 0, 0)
    doc.line(14, 90, 196, 90)

    doc.setFontSize(14)
    doc.text('Produtos', 14, 100)

    doc.setFontSize(11)
    doc.text('Item', 14, 110)
    doc.text('Preço', 170, 110, { align: 'right' })
    
    let yPosition = 118
    order.products.forEach((product) => {
      doc.text(product.name, 14, yPosition)
      doc.text(`${product.price.toFixed(2)} €`, 170, yPosition, { align: 'right' })
      yPosition += 8
    })

    doc.setDrawColor(0, 0, 0)
    doc.line(14, yPosition + 3, 196, yPosition + 3)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Total:', 130, yPosition + 15)
    doc.text(`${order.total.toFixed(2)} €`, 170, yPosition + 15, { align: 'right' })

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('ENEI - Encontro Nacional de Estudantes de Informática', 105, 280, { align: 'center' })
    
    doc.save(`ENEI_Fatura_${order.id}.pdf`)
  }

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
            <Button
              variant="ghost"
              size="icon"
              title="Descarregar Fatura"
              onClick={() => generateInvoice(order)}
            >
              <FontAwesomeIcon icon={faFileInvoice} />
            </Button>
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
