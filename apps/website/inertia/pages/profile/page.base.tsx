import { Link } from "@tuyau/inertia/react";
import { Pencil, QrCode, User } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState } from "react";
import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button, buttonVariants } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { cn } from "~/lib/utils";

// Slot components - based on https://dev.to/neetigyachahar/what-is-the-react-slots-pattern-2ld9
// Nuno: I ABSOLUTELY HATE REACT AND HOW THEY HANDLE THIS
export const ProfileDetailsSlot: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>{children}</>
);
export const BadgesSlot: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;
export const ExtraSlot: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;
export const LinksSlot: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

export type BaseProfilePageProps = React.PropsWithChildren<{
  canEditProfile?: boolean;
  avatarLogo?: string;
  profileName: string;
  about?: string;
}>;

export default function ProfilePageBase(props: BaseProfilePageProps) {
  const { canEditProfile, avatarLogo, profileName, about, children } = props;

  // TODO: Nuno: see if this impacts performance
  const childrenAsArray = React.Children.toArray(children);

  const ProfileDetails = childrenAsArray.find(
    (child) => React.isValidElement(child) && child.type === ProfileDetailsSlot,
  );
  const Badges = childrenAsArray.find(
    (child) => React.isValidElement(child) && child.type === BadgesSlot,
  );
  const Extra = childrenAsArray.find(
    (child) => React.isValidElement(child) && child.type === ExtraSlot,
  );
  const Links = childrenAsArray.find(
    (child) => React.isValidElement(child) && child.type === LinksSlot,
  );

  const [windowHref, setWindowHref] = useState("");

  useEffect(() => {
    setWindowHref(window.location.href);
  });

  return (
    <Page title={`${profileName}`} className="bg-enei-beige text-enei-blue" variant="beige">
      <Container className="mt-8">
        <section className="relative z-10 flex flex-col gap-8 md:justify-between">
          <div className="flex flex-row justify-normal gap-4">
            <h3 className="text-2xl">Perfil do Utilizador</h3>
            {canEditProfile && (
              <Link
                route="pages:profile.edit"
                className={cn(buttonVariants({ variant: "default" }), "w-fit")}
              >
                <Pencil />
                <p className="">Editar</p>
              </Link>
            )}
          </div>

          <section className="grid items-center gap-4 md:grid-cols-[auto_1fr] md:gap-8">
            <div className="bg-enei-blue mx-auto size-fit rounded-sm md:mx-0">
              {avatarLogo ? (
                <Avatar className="text-enei-beige h-48 w-48">
                  <AvatarImage src={avatarLogo} />
                </Avatar>
              ) : (
                <User className="text-enei-beige h-48 w-48" />
              )}
            </div>
            <section className="flex h-full flex-col justify-between gap-2 text-center md:text-start">
              <header>
                <p className="text-3xl">{profileName}</p>
              </header>
              {ProfileDetails}
              <div className="flex flex-row flex-wrap justify-center gap-2 md:justify-start">
                {Links}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-fit">
                      <QrCode />
                      Código QR
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-4/5 max-w-96 pt-12 sm:w-96">
                    <QRCodeSVG value={windowHref} className="aspect-square h-full w-full" />
                    <p className="text-center"> {windowHref} </p>
                  </DialogContent>
                </Dialog>
              </div>
              {Badges}
            </section>
          </section>
          <section className="mt-4 grid grid-rows-[auto_1fr] gap-4">
            <h4 className="text-center text-lg font-bold md:text-left">Sobre</h4>
            <p>{about ?? "Sem informação."}</p>
          </section>
        </section>
        {Extra}
      </Container>
    </Page>
  );
}
