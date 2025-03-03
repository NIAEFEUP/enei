import ParticipantProfile from "#models/participant_profile";
import { Link } from '@tuyau/inertia/react'
import { User } from "lucide-react";
import { useState } from "react";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";

interface ProfileInfoDrawerProps {
    profile: ParticipantProfile
}

function ProfileInfoDrawer({
    profile
}: ProfileInfoDrawerProps) {
    const [open, setOpen] = useState<boolean>(true)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="bg-enei-beige text-enei-blue gap-4 p-4 absolute">
                <div className="flex flex-row items-center justify-between mx-auto w-1/4">
                    <User className="w-48 h-48"></User>
                    <div className="flex flex-col gap-1">
                        <Button asChild>
                            <Link route="pages:profile.show" params={{ slug: profile.slug ?? "" }} target="_blank">
                                <p>Ir para o perfil</p>
                            </Link>
                        </Button>
                        <p className="">{`${profile.firstName} ${profile.lastName}`}</p>
                        <p className="">{`${profile.university} | ${profile.course}`}</p>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ProfileInfoDrawer