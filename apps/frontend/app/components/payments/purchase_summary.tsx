interface PurchaseSummaryProps {
  item: { name: string; description: string; price: number; image: string };
}

export default function PurchaseSummary({ item }: PurchaseSummaryProps) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">1. Revê a tua compra</h2>
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="hidden h-[100px] w-[150px] rounded-md object-contain md:block"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <div
            className="text-sm text-gray-500"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
          <p className="mt-2 text-lg font-bold">{item.price.toFixed(2)}€</p>
        </div>
      </div>
    </section>
  );
}
