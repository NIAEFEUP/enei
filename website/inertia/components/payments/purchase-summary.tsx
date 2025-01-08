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
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.title}
          className="hidden md:block w-[150px] h-[100px] object-contain rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <div
            className="text-sm text-gray-500"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
          <p className="text-lg font-bold mt-2">{item.price.toFixed(2)}€</p>
        </div>
      </div>
    </section>
  )
}
