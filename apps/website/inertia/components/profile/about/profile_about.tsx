import type User from "#models/user";
import ParticipantProfileAbout from "./participant_profile_about";
import SpeakerProfileAbout from "./speaker_profile_about";

interface ProfileAboutProps {
  user: User;
}

export default function ProfileAbout({ user }: ProfileAboutProps) {
  return (
    <>
      {user.participantProfile && <ParticipantProfileAbout user={user} />}

      {user.speakerProfile && <SpeakerProfileAbout user={user} />}
    </>
  );
}
