import type User from "#models/user";
import SpeakerProfileEvents from "./speaker_profile_events";

interface SpeakerProfileAboutProps {
  user: User;
}

export default function SpeakerProfileAbout({ user }: SpeakerProfileAboutProps) {
  const profile = user.speakerProfile;

  return (
    <section>
      <p className="text-5xl font-bold uppercase">{`${profile.firstName} ${profile.lastName}`}</p>

      <p>{profile.jobTitle}</p>

      <div>
        <SpeakerProfileEvents events={profile.events} />
      </div>
    </section>
  );
}
