import type Event from "#models/event";

interface CompanyActivitiesProps {
  events: Event[];
}

export default function CompanyActivities({ events }: CompanyActivitiesProps) {
  return (
    <>
      {events.length > 0 && (
        <section>
          <h3 className="text-persian-orange text-2xl font-bold uppercase">Bancas e Atividades</h3>
          <div>
            {events.map((event) => (
              <p>Hello</p>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
