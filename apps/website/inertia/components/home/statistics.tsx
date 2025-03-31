import StatisticsItem from "./statistics_item";

export default function Statistics() {
  return (
    <section className="flex w-full flex-col items-center">
      <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">Em resumo...</h3>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticsItem title="Palestras" quantity={"21"} />
        <StatisticsItem title="Workshops" quantity={"22"} />
        <StatisticsItem title="Festas" quantity={"3"} />
        <StatisticsItem title="Prémios" quantity={"+100"} />
      </div>
    </section>
  );
}
