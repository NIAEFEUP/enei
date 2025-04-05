import User from "#models/user";
import Github from "../social/github";
import LinkedIn from "../social/linkedin";
import Website from "../social/website";

interface TeamPersonSocialsProps {
  person: User;
}

const socialComponentMap = {
  github: <Github />,
  linkedin: <LinkedIn />,
  website: <Website />,
};

export default function TeamPersonSocials({ person }: TeamPersonSocialsProps) {
  const socials = ["github", "linkedin", "website"];

  return (
    <div className="flex flex-row gap-x-2">
      {socials.map((social: string) => {
        if (person.participantProfile[social]) {
          return socialComponentMap[social];
        }
      })}
    </div>
  );
}
