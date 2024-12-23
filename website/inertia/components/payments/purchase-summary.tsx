interface PurchaseSummaryProps {
  item: {
    title: string
    description: string
    price: number
    image: string
  }
}

export default function PurchaseSummary({ item }: PurchaseSummaryProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">1. Revê a tua compra</h2>
      <div className="flex items-start space-x-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-[150px] h-[100px] object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="text-lg font-bold mt-2">{item.price.toFixed(2)}€</p>
        </div>
      </div>
    </section>
  )
}
