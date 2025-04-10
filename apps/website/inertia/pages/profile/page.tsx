import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import { Button, buttonVariants } from "~/components/ui/button";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { getUniversityById } from "~/lib/enei/signup/universities";
import { Download, User, Github, Linkedin, Globe, QrCode, LucideProps, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState, createContext } from "react";
import { Link } from "@tuyau/inertia/react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import editions from "#data/enei/editions.json" with { type: "json" };
import { Option } from "~/components/ui/multiple-selector";
import ProfileActivityInfo from "~/components/profile/profile_activity_info";
import { useAuth } from "~/hooks/use_auth";

export const ProfileContext = createContext<{ slug: string | number }>({
  slug: "",
});

interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string;
}

const ENEI_EDITIONS: Option[] = editions
  .sort((a, b) => b.year - a.year)
  .map(({ year, location }) => {
    return {
      label: location + ", " + year.toString(),
      value: year.toString(),
    };
  });

const SocialIcon = ({ icon: Icon, link }: SocialIconProps) => {
  return (
    <a
      href={link}
      className="border-enei-blue flex h-9 w-9 items-center justify-center rounded-full border-2"
    >
      <Icon className="h-5" />
    </a>
  );
};

export default function ProfilePage(
  props: InferPageProps<ProfilesController, "index"> & { profile: ParticipantProfile },
) {
  const auth = useAuth();
  const { profile, isUser } = props;

  const [windowHref, setWindowHref] = useState("");

  useEffect(() => {
    setWindowHref(window.location.href);
  });

  const profileEditions = ENEI_EDITIONS.filter((edition) =>
    profile.attendedBeforeEditions.includes(edition.value),
  ).map((edition) => edition.label);

  const socials: SocialIconProps[] = [];

  if (profile.github) socials.push({ icon: Github, link: `https://github.com/${profile.github}` });
  if (profile.linkedin)
    socials.push({ icon: Linkedin, link: `https://linkedin.com/in/${profile.linkedin}` });
  if (profile.website) socials.push({ icon: Globe, link: profile.website });

  return (
    <ProfileContext.Provider value={{ slug: profile.slug ?? "" }}>
      <Page
        title={`${profile.firstName} ${profile.lastName}`}
        className="bg-enei-beige text-enei-blue"
        variant="beige"
      >
        <Container>
          <section className="relative z-10 flex flex-col gap-8 md:justify-between">
            <div className="flex flex-row justify-normal gap-4">
              <h3 className="text-2xl">Perfil do Participante</h3>
              {isUser && (
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
                <User className="text-enei-beige h-48 w-48" />
              </div>
              <div className="flex h-full flex-col justify-between gap-2 text-center md:text-start">
                <p className="text-3xl">
                  {profile.firstName} {profile.lastName}
                </p>
                <div>
                  <p className="text-lg">
                    {" "}
                    {profile.course} &#183;{" "}
                    {profile.curricularYear === "already-finished"
                      ? "Concluído em " + profile.finishedAt
                      : profile.curricularYear + "º ano"}{" "}
                  </p>
                  <p className="text-lg"> @ {getUniversityById(profile.university)!.name} </p>
                </div>
                <div className="flex flex-row flex-wrap justify-center gap-2 md:justify-start">
                  {socials.length > 0
                    && socials.map((social: SocialIconProps) => <SocialIcon {...social} />)}
                  <div className="flex flex-row gap-2">
                    <Button className="w-fit">
                      <Download />
                      Currículo
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-fit">
                          <QrCode />
                          Código QR
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-4/5 max-w-96 pt-12 sm:w-96">
                        <QRCodeSVG value={windowHref} className="aspect-square h-full w-full" />
                        <p className="text-center"> {windowHref} </p>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                {profileEditions.length > 0 ? (
                  <div className="flex flex-row flex-wrap justify-center gap-2 md:justify-normal">
                    {profileEditions.map((edition) => (
                      <Badge>{edition}</Badge>
                    ))}
                  </div>
                ) : (
                  <div>
                    <Badge variant={"default"}>Primeiro ENEI</Badge>
                  </div>
                )}
              </div>
            </section>
            <section className="mt-4 grid grid-rows-[auto_1fr] gap-4">
              <div>
                <h4 className="text-center text-lg font-bold md:text-left">Sobre</h4>
                <p>{profile.about ?? "Sem informação."}</p>
              </div>
            </section>
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
