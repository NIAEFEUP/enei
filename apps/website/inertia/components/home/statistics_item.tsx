interface StatisticsItemProps {
  title: string;
  quantity: string;
}

export default function StatisticsItem({ title, quantity }: StatisticsItemProps) {
  return (
    <div className="bg-enei-beige text-enei-blue flex flex-col">
      <div className="relative left-8 top-6 h-10 w-10 -translate-x-1/2 transform bg-[#9EBD9F]" />

      <div>
        <div className="relative">
          <span
            className="text-5xl font-bold text-transparent"
            style={{ WebkitTextStroke: "0.15em #0B4F6C" }}
          >
            {quantity}
          </span>
          <span className="absolute inset-0 text-5xl font-bold text-white">{quantity}</span>
        </div>
        <p className="text-enei-blue text-3xl font-bold lowercase">{title}</p>
      </div>
    </div>
  );
}
