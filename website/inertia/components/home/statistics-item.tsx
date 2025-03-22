interface StatisticsItemProps {
    title: string
    quantity: number
}

export default function StatisticsItem({
    title,
    quantity
}: StatisticsItemProps) {
    return (
        <div className="flex flex-col bg-enei-beige text-enei-blue">
            <div className="relative top-6 left-8 transform -translate-x-1/2 w-10 h-10 bg-[#9EBD9F]" />

            <div>
                <div className="relative">
                    <span className="text-5xl font-bold text-transparent" style={{ WebkitTextStroke: '0.15em #0B4F6C'}}>
                        {quantity}
                    </span>
                    <span className="text-5xl font-bold text-white absolute inset-0">
                        {quantity}
                    </span>
                </div>
                <p className="text-3xl font-bold text-enei-blue lowercase">
                    {title}
                </p>
            </div>
        </div>
    )
}