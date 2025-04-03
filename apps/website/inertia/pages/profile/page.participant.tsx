import ParticipantProfile from "#models/participant_profile";
import { getUniversityById } from "~/lib/enei/signup/universities";
import BaseProfilePage, {
  BaseProfilePageProps,
  BadgesSlot,
  LinksSlot,
  ProfileDetailsSlot,
} from "./page.base";
import { Download, Github, Globe, Linkedin, LucideProps } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ENEI_EDITIONS } from "~/lib/enei/signup/editions";
import { Badge } from "~/components/ui/badge";

type Props = Omit<BaseProfilePageProps, "canEditProfile" | "profileName"> & {
  profile: ParticipantProfile;
};

interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string;
}

const SocialIcon = ({ icon: Icon, link }: SocialIconProps) => {
  return (
    <a
      href={link}
      className="border-enei-blue flex h-9 w-9 items-center justify-center rounded-full border-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="h-5" />
    </a>
  );
};

export default function ParticipantProfilePage(props: Props) {
  const { profile } = props;

  const socials: SocialIconProps[] = [];

  const profileEditions = profile.attendedBeforeEditions
    ? ENEI_EDITIONS.filter((edition) => profile.attendedBeforeEditions.includes(edition.value)).map(
        (edition) => edition.label,
      )
    : [];

  if (profile.github) socials.push({ icon: Github, link: profile.github });
  if (profile.linkedin) socials.push({ icon: Linkedin, link: profile.linkedin });
  if (profile.website) socials.push({ icon: Globe, link: profile.website });

  return (
    <BaseProfilePage
      canEditProfile={true}
      profileName={`${profile.firstName} ${profile.lastName}`}
      about={profile.about ?? undefined}
      {...props}
    >
      <ProfileDetailsSlot>
        <p className="text-lg">
          {" "}
          {profile.course} &#183;{" "}
          {profile.curricularYear === "already-finished"
            ? "Concluído em " + profile.finishedAt
            : profile.curricularYear + "º ano"}{" "}
        </p>
        <p className="text-lg"> @ {getUniversityById(profile.university)!.name} </p>
      </ProfileDetailsSlot>

      <LinksSlot>
        {socials.length > 0
          && socials.map((social: SocialIconProps, i) => (
            <SocialIcon key={`social-icon-${i}`} {...social} />
          ))}
        <Button className="w-fit">
          <Download />
          Currículo
        </Button>
      </LinksSlot>

      <BadgesSlot>
        {profileEditions.length > 0 ? (
          <div className="flex flex-row flex-wrap justify-center gap-2 md:justify-normal">
            {profileEditions.map((edition, i) => (
              <Badge key={`badge-${edition}-${i}`}>{edition}</Badge>
            ))}
          </div>
        ) : (
          <div>
            <Badge variant={"default"}>Primeiro ENEI</Badge>
          </div>
        )}
      </BadgesSlot>
    </BaseProfilePage>
  );
}
