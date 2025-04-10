import User from "#models/user";
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
  user: User
}

export default function ProfileSocials({
    user
}: ProfileSocialsProps) {
    const socials = user.socials

    return (
        <>

            <ul className="mt-7 flex flex-col gap-5">
                {socials.length > 0
                    && socials.map((social: SocialIconProps) => <SocialItem {...social} />)}
            </ul>
        </>
    )
}