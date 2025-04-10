import type ParticipantProfile from "#models/participant_profile";
import { Link } from "@tuyau/inertia/react";
import { User } from "lucide-react";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import NFC from "../credentials/nfc";
import { useTuyau } from "~/hooks/use_tuyau";

interface ProfileInfoDrawerProps {
  profile: ParticipantProfile;
  onClose: () => void;
}

function ProfileInfoDrawer({ profile, onClose }: ProfileInfoDrawerProps) {
  const tuyau = useTuyau();

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
        <div className="mx-auto flex w-1/4 flex-row items-center justify-between">
          <User className="h-48 w-48"></User>
          <div className="flex flex-col gap-1">
            <Button asChild>
              <Link
                route="pages:profile.show"
                params={{ slug: profile.user.slug ?? "" }}
                target="_blank"
              >
                <p>Ir para o perfil</p>
              </Link>
            </Button>
            <p className="">{`${profile.firstName} ${profile.lastName}`}</p>
            <p className="">{`${profile.university} | ${profile.course}`}</p>
          </div>
        </div>

        <NFC
          makeReadOnly
          writeValue={{
            records: [
              {
                recordType: "url",
                data: tuyau.$url("pages:profile.show", {
                  params: { slug: profile.slug ?? "" },
                }),
              },
            ],
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileInfoDrawer;
