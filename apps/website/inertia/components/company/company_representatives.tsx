import type RepresentativeProfile from "#models/representative_profile";

interface CompanyRepresentativesProps {
  representatives: RepresentativeProfile[];
}

export default function CompanyRepresentatives({ representatives }: CompanyRepresentativesProps) {
  return (
    <section className="flex flex-col gap-y-4">
      <h3 className="text-persian-orange text-2xl font-bold uppercase">Representantes</h3>
      <div className="flex flex-row gap-x-4">
        {representatives.map((representative) => (
          <article className="flex flex-col">
            <img 
              src={representative.image ?? ""} 
              className="w-32 rounded-md"
              alt={`${representative.firstName} ${representative.lastName}`}
            />
            <p>{`${representative.firstName} ${representative.lastName}`}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
