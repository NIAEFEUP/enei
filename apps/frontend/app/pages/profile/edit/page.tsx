import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import { Card } from "@enei/shadcn/ui/card";
import { Button } from "@enei/shadcn/ui/button";
import Page from "#components/common/page";
import Container from "#components/common/containers/base";
import { getUniversityById } from "#lib/enei/signup/universities";
import {
  Download,
  EyeOff,
  User,
  Github,
  Instagram,
  Linkedin,
  Globe,
  LucideProps,
} from "@enei/shadcn/icons";

interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string;
}

function SocialIcon({ icon: Icon, link }: SocialIconProps) {
  return (
    <a
      href={link}
      className="border-enei-blue flex h-9 w-9 items-center justify-center rounded-full border-2"
    >
      <Icon className="h-5" />
    </a>
  );
}

export default function ProfileEditPage(
  props: InferPageProps<ProfilesController, "index"> & { profile: ParticipantProfile },
) {
  const { profile, isUser } = props;

  /*
  const districts_dict = districts.reduce(
    (dict: { [id: string]: string; }, el: { id: string; name: string }, _) => (dict[el.id] = el.name, dict),
    {}
  );
  */

  // districts.find(({ id: universityId }) => universityId === id)

  return (
    <Page title="Perfil" className="bg-enei-blue text-white">
      <Container>
        <section className="relative z-10 flex flex-col gap-8 md:justify-between">
          <Card className="flex flex-col gap-4 p-4">
            <h3 className="text-2xl">Perfil do Participante</h3>

            <section className="grid items-center gap-4 sm:grid-cols-[auto_1fr] sm:gap-8">
              <div className="bg-enei-beige mx-auto size-fit rounded-sm sm:mx-0">
                <User className="h-48 w-48" />
              </div>
              <div className="flex h-full flex-col justify-between gap-2 py-0 text-center sm:text-start md:py-4">
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
                <div className="flex flex-row justify-center gap-2 sm:justify-start">
                  <SocialIcon icon={Github} link={"https://github.com"} />
                  <SocialIcon icon={Instagram} link={"https://instagram.com"} />
                  <SocialIcon icon={Linkedin} link={"https://linkedin.com"} />
                  <SocialIcon icon={Globe} link={"https://google.com"} />
                  <Button className="w-fit">
                    <Download />
                    Currículo
                  </Button>
                </div>
              </div>
            </section>
            <section>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </section>
            {isUser && (
              <section>
                <div className="my-2 grid grid-cols-[auto_1fr] items-center gap-2">
                  <EyeOff />
                  <p> As informações a baixo estão visíveis apenas para ti. </p>
                </div>
                Primeiro Nome: {profile.firstName}
                <br />
                Último Nome: {profile.lastName}
                <br />
                Data de Nascimento: {profile.dateOfBirth.toLocaleString()}
                <br />
                Número de Telemóvel: {profile.phone}
                <br />
                Natural de: {profile.municipality}
                <br />
                Universidade/Faculdade: {profile.university}
                <br />
                Curso: {profile.course}
                <br />
                Ano Curricular: {profile.curricularYear} {profile.finishedAt}
                <br />
                Tamanho da T-Shirt: {profile.shirtSize}
                <br />
                Restrições Alimentares: {profile.dietaryRestrictions}
                <br />
                Vegetariano?: {profile.isVegetarian}
                <br />
                Vegan?: {profile.isVegan}
                <br />
                Como estou a pensar deslocar-me para o evento: {profile.transports}
                <br />
                Como ouviste falar do ENEI?: {profile.heardAboutEnei}
                <br />
                Qual a principal razão para te inscreveres no ENEI?: {profile.reasonForSignup}
                <br />
                Já participaste em alguma edição do ENEI?: {profile.attendedBeforeEditions}
              </section>
            )}
          </Card>
        </section>
      </Container>
    </Page>
  );
}
