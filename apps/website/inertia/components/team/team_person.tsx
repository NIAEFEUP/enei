import User from "#models/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import TeamPersonSocials from "./team_person_socials";

interface TeamPersonProps {
  person: User;
}

export default function TeamPerson({ person }: TeamPersonProps) {
  return (
    <article className="flex flex-col gap-y-2">
      <Avatar>
        <AvatarImage src="https://cdn.frankerfacez.com/emoticon/731466/4" />
        <AvatarFallback>{`${person.participantProfile.firstName[0]} ${person.participantProfile.lastName[0]}`}</AvatarFallback>
      </Avatar>
      {/* <img */}
      {/*   className="w-64" */}
      {/*   src={`/images/team/${person.email.split("@")[0]}.jpg`} */}
      {/* /> */}
      <section className="flex flex-row justify-between gap-x-2">
        <h4 className="text-enei-blue">
          {person.participantProfile.firstName} {person.participantProfile.lastName}
        </h4>
        <section className="flex flex-row">
          <TeamPersonSocials person={person} />
        </section>
      </section>
    </article>
  );
}
