import axios from "axios";
import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import { Button, buttonVariants } from "~/components/ui/button";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { getUniversityById } from "~/lib/enei/signup/universities";
import {
  Github,
  Linkedin,
  Globe,
  LucideProps,
  Pencil,
  Landmark,
  GraduationCap,
  ExternalLink,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { useEffect, useState, createContext } from "react";
import { Link } from "@tuyau/inertia/react";
import { cn } from "~/lib/utils";
import { ENEI_EDITIONS } from "~/lib/enei/signup/editions";
import { useTuyau } from "~/hooks/use_tuyau";
import ProfileActivityInfo from "~/components/profile/profile_activity_info";
import { useAuth } from "~/hooks/use_auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export const ProfileContext = createContext<{ slug: string | number }>({
  slug: "",
});

interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string;
}

const SocialItem = ({ icon: Icon, link }: SocialIconProps) => {
  return (
    <li className="flex w-fit flex-row items-center gap-6">
      <span className="h-9 w-9">
        <Icon className="h-9 w-9" />
      </span>
      <a
        href={link}
        className="break-all text-sm font-bold"
        target="_blank"
        rel="noopener noreferrer"
      >
        {link}
      </a>
    </li>
  );
};

interface RoundBadgeProps {
  icon: React.FC<LucideProps>;
  text: string;
}

const RoundBadge = ({ icon: Icon, text }: RoundBadgeProps) => {
  return (
    <span className="bg-cambridge-blue text-enei-beige flex h-fit w-fit flex-row items-center gap-[0.625rem] rounded-full px-[0.625rem] py-[0.375rem]">
      <Icon className="h-6 flex-shrink-0" />
      <p className="text-sm font-bold">{text}</p>
    </span>
  );
};

export default function ProfilePage(
  props: InferPageProps<ProfilesController, "index"> & { profile: ParticipantProfile },
) {
  const tuyau = useTuyau();
  const auth = useAuth();
  const { profile, isUser } = props;

  const profileEditions = ENEI_EDITIONS.filter((edition) =>
    profile.attendedBeforeEditions.includes(edition.value),
  ).map((edition) => edition.value);

  const socials: SocialIconProps[] = [];

  if (profile.github) socials.push({ icon: Github, link: profile.github });
  if (profile.linkedin) socials.push({ icon: Linkedin, link: profile.linkedin });
  if (profile.website) socials.push({ icon: Globe, link: profile.website });

  const [cvExpanded, setCvExpanded] = useState<boolean>(false);
  const [hasCv, setHasCv] = useState<boolean>(false);

  useEffect(() => {
    const fetchFileName = async () => {
      try {
        const response = await axios.get(
          tuyau.$url("pages:profile.cv.show", { params: { slug: profile.slug } }),
        );

        setHasCv(response.status === 200);
      } catch (error) {}
    };

    fetchFileName();
  }, []);

  return (
    <ProfileContext.Provider value={{ slug: profile.slug ?? "" }}>
      <Page title={`${profile.firstName} ${profile.lastName}`} variant="beige">
        <Container className="mt-8 grid min-h-screen max-w-7xl grid-cols-1 gap-16 md:grid-cols-[auto_1fr]">
          <section className="bg-dark-cyan hidden h-full w-[22rem] bg-opacity-20 p-12 md:block">
            <div className="sticky top-28">
              <Avatar className="mb-12 size-fit">
                <AvatarImage
                  src={tuyau.$url("pages:profile.avatar.show", { params: { slug: profile.slug } })}
                  alt={profile.slug}
                  className="text-enei-beige h-64 w-64 object-cover"
                />
                <AvatarFallback className="bg-enei-blue text-enei-beige h-64 w-64">
                  {profile.slug}
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

              <ul className="mt-7 flex flex-col gap-5">
                {socials.length > 0
                  && socials.map((social: SocialIconProps) => <SocialItem {...social} />)}
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-20 py-12">
            <header>
              <p className="mb-5 text-5xl font-bold uppercase">
                {profile.firstName} {profile.lastName}
              </p>

              <p className="mb-4 text-xl font-bold">{profile.about ?? "Sem descrição."}</p>

              <div className="mb-4 flex flex-row flex-wrap gap-5 gap-y-2">
                <RoundBadge icon={Landmark} text={getUniversityById(profile.university)!.name} />
                <RoundBadge icon={GraduationCap} text={profile.course} />
                <RoundBadge
                  icon={GraduationCap}
                  text={
                    profile.curricularYear === "already-finished"
                      ? "Concluído em " + profile.finishedAt
                      : profile.curricularYear + "º ano"
                  }
                />
              </div>

              {profileEditions.length > 0 ? (
                <div className="flex flex-row flex-wrap gap-4 gap-y-2">
                  {profileEditions.map((edition) => (
                    <span className="bg-sunray rounded-lg px-[0.625rem] py-1">
                      <p className="text-enei-beige text-base font-bold">ENEI {edition}</p>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex flex-row flex-wrap gap-4 gap-y-2">
                  <span className="bg-enei-blue rounded-lg px-[0.625rem] py-1">
                    <p className="text-enei-beige text-base font-bold">Primeiro ENEI</p>
                  </span>
                </div>
              )}
            </header>

            {hasCv && (
              <div>
                <h3 className="text-persian-orange mb-5 text-3xl font-bold uppercase">Currículo</h3>
                <div className="mb-4 flex flex-row flex-wrap gap-4 gap-y-2">
                  {cvExpanded ? (
                    <Button
                      onClick={() => setCvExpanded(false)}
                      className={cn(buttonVariants({ variant: "destructive" }))}
                    >
                      Recolher
                      <Minimize2 className="h-6 flex-shrink-0" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCvExpanded(true)}
                      className={cn(buttonVariants({ variant: "default" }))}
                    >
                      Expandir
                      <Maximize2 className="h-6 flex-shrink-0" />
                    </Button>
                  )}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={tuyau.$url("pages:profile.cv.show", { params: { slug: profile.slug } })}
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Abrir noutro separador
                    <ExternalLink className="h-6 flex-shrink-0" />
                  </a>
                </div>

                <div
                  className={cn(
                    "max-h-screen overflow-y-hidden transition-all duration-500",
                    !cvExpanded && "max-h-64",
                  )}
                >
                  <object
                    data={tuyau.$url("pages:profile.cv.show", { params: { slug: profile.slug } })}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    className={cn("h-64", cvExpanded && "h-screen")}
                  >
                    <p>Não foi possível mostrar o ficheiro nesta página.</p>
                  </object>
                </div>
              </div>
            )}
          </section>
          <section>
            {auth.state === "authenticated" && auth.user?.role === "staff" && (
              <ProfileActivityInfo />
            )}
          </section>
        </Container>
      </Page>
    </ProfileContext.Provider>
  );
}
