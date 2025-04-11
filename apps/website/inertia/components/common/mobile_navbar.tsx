import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@enei/shadcn/ui/sheet";
import { Button, buttonVariants } from "@enei/shadcn/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@enei/shadcn/ui/dialog";
import { AlignJustify, QrCode } from "@enei/shadcn/icons";
import { useAuth } from "~/hooks/use_auth";
import { cn } from "@enei/shadcn/cn";
import { QRCodeSVG } from "qrcode.react";
import { useTuyau } from "~/hooks/use_tuyau";
import { Link } from "@tuyau/inertia/react";
import { LoginButton, LogoutButton } from "./navbar";

export default function MobileNavbar() {
  const auth = useAuth();

  const tuyau = useTuyau();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <AlignJustify className="bg-transparent" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-y-4">
        <SheetHeader>
          {auth.state === "authenticated" && <Link route="pages:profile.default">Perfil</Link>}
        </SheetHeader>
        <div className="flex flex-col justify-center gap-y-4">
          <div className={auth.state === "authenticated" ? "mx-auto block" : "mx-auto hidden"}>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-fit">
                  <QrCode />
                  Código QR
                </Button>
              </DialogTrigger>
              <DialogContent className="w-4/5 max-w-96 pt-12 sm:w-96">
                {auth.state === "authenticated" && (
                  <>
                    <QRCodeSVG
                      value={`${tuyau.$url("pages:profile.show", { params: { slug: auth.user.slug } })}`}
                      className="aspect-square h-full w-full"
                    />
                    <p className="text-center"> {auth.user.slug}</p>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>

          <div
            className={
              auth.state === "authenticated" && auth.user.role === "staff" ? "block" : "hidden"
            }
          >
            <Link
              route="pages:staff.credentials.scan"
              className={cn(buttonVariants({ variant: "link" }), `text-enei-blue`)}
            >
              <QrCode />
            </Link>
          </div>

          <Link
            route="pages:store"
            className={cn(buttonVariants({ variant: "link" }), `text-enei-blue p-0`)}
          >
            Loja
          </Link>

          <Link
            route="pages:referrals"
            className={cn(
              buttonVariants({ variant: "link" }),
              `text-enei-blue p-0 ${auth.state === "authenticated" ? "inline-flex" : "hidden"}`,
            )}
          >
            Referenciações
          </Link>

          <Link
            route="pages:events"
            className={cn(buttonVariants({ variant: "link" }), `text-enei-blue p-0`)}
          >
            Programa
          </Link>

          {auth.state === "unauthenticated" && <LoginButton />}

          {auth.state === "authenticated" && (
            <div className="flex justify-center">
              <LogoutButton />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
