import { Link } from "@tuyau/inertia/react";
import { User as UserIcon } from "lucide-react";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import CredentialWriter from "../credentials/writer";
import User from "#models/user";

interface ProfileInfoDrawerProps {
  user: User;
  onClose: () => void;
}

function ProfileInfoDrawer({ user, onClose }: ProfileInfoDrawerProps) {
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
            <UserIcon className="size-16" />
            <div className="flex flex-col">
              <p>
                <Link
                  className="after:absolute after:inset-0 hover:underline"
                  route="pages:profile.show"
                  params={{ slug: user.slug ?? "" }}
                  target="_blank"
                >
                  {user.participantProfile.firstName} {user.participantProfile.lastName}
                </Link>
              </p>
              <p>{user.slug}</p>
            </div>
          </div>

          <CredentialWriter slug={user.slug ?? ""} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileInfoDrawer;
