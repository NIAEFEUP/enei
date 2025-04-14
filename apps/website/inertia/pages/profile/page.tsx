import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";

import { Pencil } from "lucide-react";
import { createContext } from "react";
import ProfileSocials from "~/components/profile/profile_socials";
import type User from "#models/user";
import ProfileAbout from "~/components/profile/about/profile_about";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useTuyau } from "~/hooks/use_tuyau";
import { Button, buttonVariants } from "~/components/ui/button";
import { Link } from "@tuyau/inertia/react";
import { cn } from "~/lib/utils";

export const ProfileContext = createContext<{ slug: string | number }>({
  slug: "",
});

export default function ProfilePage({
  user,
  isUser,
}: InferPageProps<ProfilesController, "index"> & { user: User; isUser: boolean }) {
  const tuyau = useTuyau();

  return (
    <ProfileContext.Provider value={{ slug: user.slug ?? "" }}>
      <Page title="Perfil" variant="beige">
        <Container className="mt-8 grid min-h-screen max-w-7xl grid-cols-1 gap-16 md:grid-cols-[auto_1fr]">
          <section className="bg-dark-cyan hidden h-full w-[22rem] bg-opacity-20 p-12 md:block">
            <div className="sticky top-28">
              <Avatar className="mb-12 size-fit">
                <AvatarImage
                  src={tuyau.$url("pages:profile.avatar.show", {
                    params: { slug: user.slug ?? "" },
                  })}
                  alt={user.slug ?? ""}
                  className="text-enei-beige h-64 w-64 object-cover"
                />
                <AvatarFallback className="bg-enei-blue text-enei-beige h-64 w-64">
                  {user.slug}
                </AvatarFallback>
              </Avatar>

              {isUser && (
                <Button asChild className="w-full">
                  <Link route="pages:profile.edit" params={{ section: "profile" }}>
                    <Pencil />
                    <span>Editar Informações</span>
                  </Link>
                </Button>
              )}

              <ProfileSocials user={user as User} />
            </div>
          </section>

          <section className="flex flex-col gap-20 py-12">
            <div className="flex flex-col gap-4 md:hidden">
              <Avatar className="mx-auto mb-12 size-fit">
                <AvatarImage
                  src={tuyau.$url("pages:profile.avatar.show", {
                    params: { slug: user.slug ?? "" },
                  })}
                  alt={user.slug ?? ""}
                  className="text-enei-beige h-64 w-64 object-cover"
                />
                <AvatarFallback className="bg-enei-blue text-enei-beige h-64 w-64">
                  {user.slug}
                </AvatarFallback>
              </Avatar>
              {isUser && (
                <Link
                  route="pages:profile.edit"
                  params={{ section: "profile" }}
                  className={cn(buttonVariants(), "mx-auto w-full max-w-md")}
                >
                  <span className="flex flex-row justify-center gap-2">
                    <Pencil />
                    Editar Informações
                  </span>
                </Link>
              )}
            </div>
            <div>
              <ProfileAbout user={user} />
            </div>
          </section>

          {/* <section>
            {auth.state === "authenticated" && auth.user?.role === "staff" && (
              <ProfileActivityInfo />
            )}
          </section> */}
        </Container>
      </Page>
    </ProfileContext.Provider>
  );
}
