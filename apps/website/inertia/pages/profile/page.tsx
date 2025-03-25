import axios from "axios";
import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import { buttonVariants } from "~/components/ui/button";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { getUniversityById } from "~/lib/enei/signup/universities";
import {
  User,
  Github,
  Linkedin,
  Globe,
  LucideProps,
  Pencil,
  Landmark,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tuyau/inertia/react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { ENEI_EDITIONS } from "~/lib/enei/signup/editions";
import { useTuyau } from "~/hooks/use_tuyau";

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
      <a href={link} className="text-sm font-bold" target="_blank" rel="noopener noreferrer">
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
  const { profile, isUser } = props;

  const profileEditions = ENEI_EDITIONS.filter((edition) =>
    profile.attendedBeforeEditions.includes(edition.value),
  ).map((edition) => edition.value);

  const socials: SocialIconProps[] = [];

  if (profile.github) socials.push({ icon: Github, link: profile.github });
  if (profile.linkedin) socials.push({ icon: Linkedin, link: profile.linkedin });
  if (profile.website) socials.push({ icon: Globe, link: profile.website });

  const [_, setHasCv] = useState<boolean>(false);

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
    <Page
      title={`${profile.firstName} ${profile.lastName}`}
      className="bg-enei-beige text-enei-blue"
    >
      <Container className="mt-8 grid min-h-screen grid-cols-[auto_1fr] gap-16 md:px-0">
        <section className="bg-dark-cyan hidden h-full w-[22rem] bg-opacity-20 px-12 pt-12 md:block">
          <div className="bg-enei-blue mb-12 size-fit overflow-clip rounded-full">
            <User className="text-enei-beige h-64 w-64" />
          </div>

          {isUser && (
            <Link
              route="pages:profile.edit"
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
        </section>

        <section className="flex flex-col gap-20 pt-12">
          <header>
            <p className="mb-5 text-5xl font-bold uppercase">
              {profile.firstName} {profile.lastName}
            </p>

            <p className="mb-4 text-xl font-bold">{profile.about ?? "Sem informação."}</p>

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
              <div>
                <Badge variant={"default"}>
                  <p className="text-base font-bold">Primeiro ENEI</p>
                </Badge>
              </div>
            )}
          </header>

          <div>
            <p className="text-persian-orange mb-5 text-3xl font-bold uppercase">Currículo</p>
            Visualizar Curriculo aqui!
          </div>
        </section>
      </Container>
    </Page>
  );
}
