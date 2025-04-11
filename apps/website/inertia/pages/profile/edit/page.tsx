import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { Card } from "@enei/shadcn/ui/card";
import ProfileInfoForm from "~/components/profile/1_profile_info";
import TbdInfoForm from "~/components/profile/2_tbd_info";
import AccountInfoForm from "~/components/profile/3_account_info";
import { Link } from "@tuyau/inertia/react";
import { CustomTabsList, CustomTabTrigger } from "~/components/profile/common/custom_tabs";

export default function ProfileEditPage(
  props: InferPageProps<ProfilesController, "index"> & {
    profile: ParticipantProfile;
    section: string;
  },
) {
  const { profile, section }: { profile: ParticipantProfile; section: string } = props;

  const sections = { profile: "Perfil", account: "Conta" };

  let activeSection = section;
  if (!Object.keys(sections).includes(section)) {
    activeSection = "profile";
  }

  // TODO: Follow the github edit information page style, should be able to change profile image, email and password

  return (
    <Page title={`${profile.firstName} ${profile.lastName}`} variant="blue">
      <Container className="mt-8 min-h-screen max-w-7xl">
        <Card className="grid min-h-[48rem] grid-cols-1 grid-rows-[auto_1fr] rounded-xl px-0 lg:grid-cols-[auto_1fr] lg:grid-rows-1 lg:gap-16 lg:px-0">
          <section className="outline-enei-blue h-full w-full rounded-tr-[30px] bg-opacity-20 py-6 outline-4 lg:block lg:w-[22rem] lg:outline">
            <div className="sticky top-28">
              <p className="text-enei-blue mb-6 px-12 text-4xl font-bold">Definições</p>
              <ul className="text-enei-blue flex flex-col">
                <CustomTabsList className="w-full lg:flex-col">
                  {Object.entries(sections).map(([key, value]) => (
                    <CustomTabTrigger active={key === activeSection} className="lg:pl-10">
                      <Link
                        route="pages:profile.edit"
                        params={{ section: key }}
                        preserveScroll
                        className="inline-flex h-full w-full items-center justify-center lg:justify-start"
                      >
                        {value}
                      </Link>
                    </CustomTabTrigger>
                  ))}
                </CustomTabsList>
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-4 px-4 pb-6 lg:pt-12">
            {activeSection === "profile" && <ProfileInfoForm profile={profile} />}
            {activeSection === "account" && <AccountInfoForm />}
            {activeSection === "tbd" && <TbdInfoForm profile={profile} />}
          </section>
        </Card>
      </Container>
    </Page>
  );
}
