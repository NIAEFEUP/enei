import SpeakerProfile from "#models/speaker_profile";
import { Button } from "~/components/ui/button";
import BaseProfilePage, {
  BadgesSlot,
  BaseProfilePageProps,
  LinksSlot,
  ProfileDetailsSlot,
} from "./page.base";
import { Globe } from "lucide-react";
import { Badge } from "~/components/ui/badge";

type Props = Omit<BaseProfilePageProps, "canEditProfile" | "profileName"> & {
  profile: SpeakerProfile;
};

function convertSpeakerRoleToBadgeText(speakerRole: SpeakerProfile["speakerRole"]) {
  switch (speakerRole) {
    case "keynote_speaker":
      return "Keynote Speaker";
    case "panelist":
      return "Panelist";
    case "moderator":
      return "Moderator";
    default:
      return "Speaker";
  }
}

export default function SpeakerProfilePage(props: Props) {
  const { profile } = props;

  return (
    <BaseProfilePage
      canEditProfile={false}
      profileName={`${profile.firstName} ${profile.lastName}`}
      about={profile.about ?? undefined}
      {...props}
    >
      <ProfileDetailsSlot>
        <div>
          <p className="text-lg"> &#183; {profile.jobTitle} &#183; </p>
          <p className="text-lg"> @ {profile.company.name} </p>
        </div>
      </ProfileDetailsSlot>

      <LinksSlot>
        {/* TODO: Nuno: this generates an error on hydration, ORCIDLink is null on the server */}
        <a href={profile.ORCIDLink ?? undefined} target="_blank" rel="noopener noreferrer">
          <Button className="w-fit">
            <Globe />
            ORCID Link
          </Button>
        </a>
      </LinksSlot>

      <BadgesSlot>
        <div>
          {/* TODO: Nuno: see if we can get rid of this div while maintaining the badge's width */}
          <Badge variant={"default"}>{convertSpeakerRoleToBadgeText(profile.speakerRole)}</Badge>
        </div>
      </BadgesSlot>
    </BaseProfilePage>
  );
}
