import { TicketCartCard } from '~/components/payments/ticket-cart-card'

const item = {
  title: 'Bilhete - Com alojamento',
  description: 'TThis is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1This is item 1his is item 1',
  price: 35,
}

export default function index() {
  return (
    <div>
      <TicketCartCard {...item} />
    </div>
  )
}
