import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import ProfileInfoForm from "~/components/profile/1_profile_info";
import TbdInfoForm from "~/components/profile/2_tbd_info";
import AccountInfoForm from "~/components/profile/3_account_info";
import { Link } from "@tuyau/inertia/react";

export default function ProfileEditPage(
  props: InferPageProps<ProfilesController, "index"> & {
    profile: ParticipantProfile;
    section: string;
  },
) {
  const { profile, section }: { profile: ParticipantProfile; section: string } = props;

  const sections = { profile: "Perfil", account: "Conta" };
  console.log("section", section, Object.keys(sections).includes(section));

  let activeSection = section;
  if (!Object.keys(sections).includes(section)) {
    activeSection = "profile";
  }

  // TODO: Follow the github edit information page style, should be able to change profile image, email and password

  return (
    <Page title={`${profile.firstName} ${profile.lastName}`} variant="blue">
      <Container className="mt-8 min-h-screen max-w-7xl">
        <Card className="grid min-h-[48rem] grid-cols-1 grid-rows-[auto_1fr] rounded-xl px-0 md:grid-cols-[auto_1fr] md:grid-rows-1 md:gap-16 md:px-0">
          <section className="outline-enei-blue h-full w-full rounded-tr-[30px] bg-opacity-20 py-6 outline-4 md:block md:w-[22rem] md:outline">
            <div className="sticky top-28">
              <p className="text-enei-blue mb-6 px-12 text-4xl font-bold">Definições</p>
              <ul className="text-enei-blue flex flex-col">
                {/* TODO: Name this div VerticalTabsList, make button rounded and more like the tabs component */}
                <div className="bg-muted text-muted-foreground inline-flex h-fit items-center justify-center rounded-lg p-1 md:flex-col md:p-0">
                  {Object.entries(sections).map(([key, value]) => (
                    <Link
                      route="pages:profile.edit"
                      params={{ section: key }}
                      className={cn(
                        "flex h-[60px] cursor-pointer items-center px-12 text-3xl md:w-full md:py-2",
                        key === activeSection && "bg-enei-blue text-white",
                      )}
                      preserveScroll
                    >
                      {value}
                    </Link>
                  ))}
                </div>
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-4 px-4 py-12">
            {activeSection === "profile" && <ProfileInfoForm profile={profile} />}
            {activeSection === "account" && <AccountInfoForm />}
            {activeSection === "tbd" && <TbdInfoForm profile={profile} />}
          </section>
        </Card>
      </Container>
    </Page>
  );
}
