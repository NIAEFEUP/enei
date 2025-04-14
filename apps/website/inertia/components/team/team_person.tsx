import User from "#models/user";

interface TeamPersonProps {
  person: User;
}

export default function TeamPerson({ person }: TeamPersonProps) {
  return (
    <article className="flex flex-col gap-y-2">
      <div className="mx-auto size-24 rounded-full">
        <img
          className="mx-auto size-24 rounded-full object-cover"
          src={person.avatar?.url}
          decoding="async"
          loading="eager"
        />
      </div>
      <section className="flex flex-row justify-between gap-x-2">
        <h4 className="text-enei-blue mx-auto text-center">
          {person.staffProfile.firstName} {person.staffProfile.lastName}
        </h4>
      </section>
    </article>
  );
}
