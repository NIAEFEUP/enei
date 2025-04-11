import type ParticipantProfile from "#models/participant_profile";
import { Link } from "@tuyau/inertia/react";
import { User } from "lucide-react";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import CredentialWriter from "../credentials/writer";

interface ProfileInfoDrawerProps {
  profile: ParticipantProfile;
  onClose: () => void;
}

function ProfileInfoDrawer({ profile, onClose }: ProfileInfoDrawerProps) {
  return (
    <Drawer
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            onClose();
          }, 300);
        }
      }}
    >
      <DrawerContent className="bg-enei-beige text-enei-blue absolute gap-4 p-4">
        <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-2">
          <div className="relative flex flex-row items-center">
            <User className="size-16" />
            <div className="flex flex-col">
              <p>
                <Link
                  className="after:absolute after:inset-0 hover:underline"
                  route="pages:profile.show"
                  params={{ slug: profile.user.slug ?? "" }}
                  target="_blank"
                >
                  {profile.firstName} {profile.lastName}
                </Link>
              </p>
              <p>{profile.user.slug}</p>
            </div>
          </div>

          <CredentialWriter slug={profile.user.slug ?? ""} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileInfoDrawer;
