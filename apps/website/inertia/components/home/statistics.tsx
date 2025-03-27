import StatisticsItem from "./statistics-item";

export default function Statistics() {
    return (
        <div className="w-full flex flex-col items-center">
            <h3 className="text-3xl font-bold text-center text-enei-blue lowercase">Em resumo...</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 lg:grid-cols-4">
                <StatisticsItem
                    title="Palestras"
                    quantity={21}
                />
                <StatisticsItem
                    title="Workshops"
                    quantity={22}
                />
                <StatisticsItem
                    title="Festas"
                    quantity={3}
                />
                <StatisticsItem
                    title="Prémios"
                    quantity={30}
                />
            </div>
        </div>
    )
}