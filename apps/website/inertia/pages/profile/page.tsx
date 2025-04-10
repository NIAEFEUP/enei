import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import { buttonVariants } from "~/components/ui/button";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";

import {
  LucideProps,
  Pencil,
} from "lucide-react";
import { createContext } from "react";
import { Link } from "@tuyau/inertia/react";
import { cn } from "~/lib/utils";
import { useTuyau } from "~/hooks/use_tuyau";
import ProfileActivityInfo from "~/components/profile/profile_activity_info";
import { useAuth } from "~/hooks/use_auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import ProfileSocials from "~/components/profile/profile_socials";
import User from "#models/user";
import ProfileAbout from "~/components/profile/about/profile_about";

export const ProfileContext = createContext<{ slug: string | number }>({
  slug: "",
});


export interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string;
}


export default function ProfilePage(
  props: InferPageProps<ProfilesController, "index"> & { user: User },
) {
  const tuyau = useTuyau();
  const auth = useAuth();
  const { user, isUser, activityInformation } = props;

  return (
    <ProfileContext.Provider value={{ slug: user.slug ?? "" }}>
      <Page title={`${User.getName(user)?.firstName} ${User.getName(user)?.lastName}`} variant="beige">
        <Container className="mt-8 grid min-h-screen max-w-7xl grid-cols-1 gap-16 md:grid-cols-[auto_1fr]">
          <section className="bg-dark-cyan hidden h-full w-[22rem] bg-opacity-20 p-12 md:block">
            <div className="sticky top-28">
              <Avatar className="mb-12 size-fit">
                <AvatarImage
                  src={tuyau.$url("pages:profile.avatar.show", { params: { slug: user.slug } })}
                  alt={user.slug}
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
                  className={cn(buttonVariants({ variant: "default" }), "w-full")}
                >
                  <Pencil />
                  <p>Editar Informações</p>
                </Link>
              )}

              <ProfileSocials 
                user={user as User}
              />
            </div>
          </section>

          <section className="flex flex-col gap-20 py-12">
            <header>
              <p className="mb-5 text-5xl font-bold uppercase">
                {User.getName(user)?.firstName} {User.getName(user)?.lastName}
              </p>

              <ProfileAbout 
                user={user}
              />
            </header>
          </section>
          <section>
            {auth.state === "authenticated" && auth.user?.role === "staff" && (
              <ProfileActivityInfo activityInformation={activityInformation} />
            )}
          </section>
        </Container>
      </Page>
    </ProfileContext.Provider>
  );
}
