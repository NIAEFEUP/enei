import Department from "#models/department";
import User from "#models/user";
import { useMemo } from "react";
import TeamPerson from "./team_person";

interface TeamSectionProps {
  department: Department;
  people: User[];
  showCarouselArrows?: boolean;
}
// 1272 1240 
export default function TeamSection({
  department,
  people,
}: TeamSectionProps) {
  const sortedPeople = useMemo(() => {
    const copy = [...people];
    return copy.toSorted((a, b) => (b.staffProfile.isCoordinator? 1 : 0) - (a.staffProfile.isCoordinator ? 1 : 0));
  }, [people])
  return (
    <section className="flex flex-col items-center justify-center gap-y-4">
      <h2 className="text-enei-blue border-enei-blue text-center text-xl font-bold">
        {department.name}
      </h2>
      <div
        className="max-w-6xl"
      >
        <div className="max-w-2/6 w-full flex flex-row flex-wrap justify-center gap-x-6 gap-y-8 mt-4">
          {sortedPeople.map((person) => (
            <TeamPerson key={`team-person-${person.id}`} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
