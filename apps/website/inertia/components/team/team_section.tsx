import Department from "#models/department";
import User from "#models/user";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import TeamPerson from "./team_person";

interface TeamSectionProps {
  department: Department;
  people: User[];
  showCarouselArrows?: boolean;
}

export default function TeamSection({
  department,
  people,
  showCarouselArrows = true,
}: TeamSectionProps) {
  people.forEach((person) => console.log("PERSON: ", person));

  return (
    <section className="flex flex-col items-center justify-center gap-y-4">
      <h2 className="text-enei-blue border-enei-blue rounded-md border-2 p-2 text-center text-xl font-bold">
        {department.name}
      </h2>
      <Carousel
        className="max-w-6xl"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="max-w-2/6 w-full">
          {people.map((person, idx) => (
            <CarouselItem key={`team-person-${idx}`} className="basis-auto">
              <TeamPerson key={`team-person-${person.id}`} person={person} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {showCarouselArrows && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </section>
  );
}
