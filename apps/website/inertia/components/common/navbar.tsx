import { useForm } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "@tuyau/inertia/react";
import { Button, buttonVariants } from "~/components/ui/button";
import { useAuth } from "~/hooks/use_auth";
import { useTuyau } from "~/hooks/use_tuyau";
import { cn } from "~/lib/utils";
import Container from "./containers";
import { useEffect, useState } from "react";
import { NotificationContainer } from "../notifications";
import { VariantProps } from "class-variance-authority";
import { QrCode } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { useIsMobile } from "~/hooks/use_mobile";
import MobileNavbar from "./mobile_navbar";

/*
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";

type PageRoute = {
  href: string;
  title: string;
};

*/

export function LoginButton({
  variant,
}: {
  variant?: VariantProps<typeof buttonVariants>["variant"];
}) {
  return (
    <Link route="pages:auth.login" className={buttonVariants({ variant })}>
      Entrar
    </Link>
  );
}

export function LogoutButton({
  variant,
}: {
  variant?: VariantProps<typeof buttonVariants>["variant"];
}) {
  const tuyau = useTuyau();
  const { post } = useForm();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(tuyau.$url("actions:auth.logout"));
  }

  return (
    <form onSubmit={onSubmit} method="post">
      <Button type="submit" variant={variant}>
        Logout
      </Button>
    </form>
  );
}

export function Navbar({ className, variant }: { className?: string; variant?: "blue" | "beige" }) {
  const auth = useAuth();

  const [onTop, setOnTop] = useState(true);

  const tuyau = useTuyau();

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "scroll",
      () => {
        setOnTop(window.scrollY === 0);
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, []);

  const isMobile = useIsMobile();

  const bgColor = variant === "blue" ? "enei-blue" : "enei-beige";
  const textColor = variant === "blue" ? "enei-beige" : "enei-blue";

  return (
    <>
      <NotificationContainer className="relative z-20 flex w-full flex-col" />
      <nav
        className={cn(
          "w-full transition-colors duration-300",
          !onTop && `bg-${bgColor} shadow-md`,
          className,
        )}
      >
        <Container>
          <div className="flex w-full flex-row flex-wrap items-center justify-between gap-2 py-6">
            <Link route="pages:home">
              <img
                className="h-auto w-20 md:w-28"
                src={variant === "blue" ? "/images/logo-white.svg" : "/images/logo-blue.svg"}
                alt="Logótipo do ENEI"
              />
              <span className="sr-only">Ir para a página inicial</span>
            </Link>
            {isMobile ? (
              <>
                <MobileNavbar />
              </>
            ) : (
              <div className="flex items-center justify-between gap-4">
                {auth.state === "authenticated"
                  && auth.user.role !== "representative"
                  && auth.user.slug && (
                    <div>
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
                  )}
                <div
                  className={
                    auth.state === "authenticated" && auth.user.role !== "representative"
                      ? "block"
                      : "hidden"
                  }
                >
                  <Link
                    route="pages:profile.default"
                    className={cn(buttonVariants({ variant: "link" }), `text-${textColor} p-0`)}
                  >
                    <span>Perfil</span>
                  </Link>
                </div>
                {auth.state === "authenticated" && (
                  <div
                    className={
                      auth.user.role === "staff" || auth.user.role === "representative"
                        ? "block"
                        : "hidden"
                    }
                  >
                    <Link
                      route={
                        auth.user.role === "staff"
                          ? "pages:staff.credentials.scan"
                          : "pages:representative.qrcode.scan"
                      }
                      className={cn(buttonVariants({ variant: "link" }), `text-enei-blue`)}
                    >
                      <QrCode />
                    </Link>
                  </div>
                )}

                {auth.state === "authenticated" && auth.user.role === "representative" && (
                  <Link
                    route="pages:company.participants"
                    className={cn(buttonVariants({ variant: "link" }), `text-enei-blue p-0`)}
                  >
                    Participantes
                  </Link>
                )}

                <div>
                  <Link
                    route="pages:store"
                    className={cn(buttonVariants({ variant: "link" }), `text-${textColor}`)}
                  >
                    <span>Loja</span>
                  </Link>
                </div>

                <Link
                  route="pages:events"
                  className={cn(buttonVariants({ variant: "link" }), `text-${textColor} p-0`)}
                >
                  Programa
                </Link>
                <div>
                  {auth.state === "authenticated" ? (
                    <LogoutButton variant={variant === "blue" ? "secondary" : "default"} />
                  ) : (
                    auth.state === "unauthenticated" && (
                      <LoginButton variant={variant === "blue" ? "secondary" : "default"} />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </nav>
    </>
  );
}
