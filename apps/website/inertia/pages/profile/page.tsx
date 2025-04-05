import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import { createContext } from "react";
import ParticipantProfilePage from "./page.participant";
import SpeakerProfilePage from "./page.speaker";
import SpeakerProfile from "#models/speaker_profile";
import CompanyProfilePage from "./page.company";
import Company from "#models/company";

export const ProfileContext = createContext<{ slug: string | number }>({
  slug: "",
});

type Props = InferPageProps<ProfilesController, "index"> & {
  profile: SpeakerProfile | ParticipantProfile | Company;
};

export default function ProfilePage(props: Props) {
  const { profile } = props;

  const user = profile.user;

  // HACK: 'isParticipant' and similar functions only exist when first rendering the page on the server.
  // Use this "trivial" solution for now
  if (user.participantProfileId !== null) {
    const { isUser } = props;

    return (
      <ParticipantProfilePage canEditProfile={isUser} profile={profile as ParticipantProfile} />
    );
  } else if (user.companyId !== null) {
    return <CompanyProfilePage profile={profile as Company} />;
  } else if (user.speakerProfileId !== null) {
    return <SpeakerProfilePage profile={profile as SpeakerProfile} />;
  } // TODO: add pages for other types of profiles
}
