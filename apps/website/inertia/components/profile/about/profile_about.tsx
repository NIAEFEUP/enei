import User from "#models/user"
import { Serialize } from "@tuyau/utils/types"
import ParticipantProfileAbout from "./participant_profile_about"

interface ProfileAboutProps {
    user: Serialize<User>
}

export default function ProfileAbout({
    user
}: ProfileAboutProps) {
    return (
        <>
            {user.participantProfile && 
                <ParticipantProfileAbout
                    profile={user.participantProfile}
                />
            }
        </>
    )
}