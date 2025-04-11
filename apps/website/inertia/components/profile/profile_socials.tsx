import type User from "#models/user";
import { Github, Globe, Linkedin } from "lucide-react";
import { SocialIconProps } from "~/pages/profile/page";

const SocialItem = ({ icon: Icon, link }: SocialIconProps) => {
  return (
    <li className="flex w-fit flex-row items-center gap-6">
      <span className="h-9 w-9">
        <Icon className="h-9 w-9" />
      </span>
      <a
        href={link}
        className="break-all text-sm font-bold"
        target="_blank"
        rel="noopener noreferrer"
      >
        {link}
      </a>
    </li>
  );
};

interface ProfileSocialsProps {
  user: User;
}

function getUserSocials(user: User) {
  const socials = [];

  if (user.role === "participant") {
    if (user.participantProfile.github)
      socials.push({ icon: Github, link: user.participantProfile.github });
    if (user.participantProfile.linkedin)
      socials.push({ icon: Linkedin, link: user.participantProfile.linkedin });
    if (user.participantProfile.website)
      socials.push({ icon: Globe, link: user.participantProfile.website });
  }

  if (user.role === "representative") {
    if (user.representativeProfile.ORCIDLink) {
      socials.push({ icon: Github, link: user.representativeProfile.ORCIDLink });
    }
  }

  return socials;
}

export default function ProfileSocials({ user }: ProfileSocialsProps) {
  const socials = getUserSocials(user);

  return (
    <>
      <ul className="mt-7 flex flex-col gap-5">
        {socials?.length > 0
          && socials?.map((social: SocialIconProps) => <SocialItem {...social} />)}
      </ul>
    </>
  );
}
