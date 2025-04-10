import SpeakerProfile from "#models/speaker_profile";
import SpeakerProfileEvents from "./speaker_profile_events";

interface SpeakerProfileAboutProps {
  profile: SpeakerProfile;
}

export default function SpeakerProfileAbout({ profile }: SpeakerProfileAboutProps) {
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
