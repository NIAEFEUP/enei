import ParticipantProfile from "#models/participant_profile";
import axios from "axios";
import {
  ExternalLink,
  GraduationCap,
  Landmark,
  LucideProps,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { useTuyau } from "~/hooks/use_tuyau";
import { ENEI_EDITIONS } from "~/lib/enei/signup/editions";
import { getUniversityById } from "~/lib/enei/signup/universities";
import { cn } from "~/lib/utils";

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

interface ParticipantProfileAboutProps {
  profile: ParticipantProfile;
}

export default function ParticipantProfileAbout({ profile }: ParticipantProfileAboutProps) {
  const [hasCv, setHasCv] = useState<boolean>(false);
  const [cvExpanded, setCvExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchFileName = async () => {
      try {
        const response = await axios.get(
          tuyau.$url("pages:profile.cv.show", { params: { slug: profile.user.slug } }),
        );

        setHasCv(response.status === 200);
      } catch (error) { }
    };

    fetchFileName();
  }, []);

  const tuyau = useTuyau();

  const profileEditions = ENEI_EDITIONS.filter((edition) =>
    profile.attendedBeforeEditions.includes(edition.value),
  ).map((edition) => edition.value);

  return (
    <>
      <p className="mb-5 text-5xl font-bold uppercase">
        {`${profile.firstName} ${profile.lastName}`}
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
              href={tuyau.$url("pages:profile.cv.show", { params: { slug: profile.user.slug } })}
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
              data={tuyau.$url("pages:profile.cv.show", { params: { slug: profile.user.slug } })}
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
    </>
  );
}
