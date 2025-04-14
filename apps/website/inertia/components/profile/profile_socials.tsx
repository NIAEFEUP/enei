import type User from "#models/user";
import { Book, Github, Globe, Linkedin, LucideProps } from "lucide-react";

export interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string | null;
}

const SocialItem = ({ icon: Icon, link }: SocialIconProps) => {
  if (!link) return null;

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

export default function ProfileSocials({ user }: ProfileSocialsProps) {
  const socials = [
    { icon: Github, link: user.participantProfile?.github },
    { icon: Linkedin, link: user.participantProfile?.linkedin },
    { icon: Globe, link: user.participantProfile?.website },
    { icon: Book, link: user.representativeProfile?.ORCIDLink },
  ] satisfies SocialIconProps[];

  return <ul className="mt-7 flex flex-col gap-5">{socials?.map(SocialItem)}</ul>;
}
