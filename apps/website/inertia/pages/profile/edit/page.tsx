import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { useState } from "react";
import ProfileInfoForm from "~/components/profile/1_profile_info";
import TbdInfoForm from "~/components/profile/2_tbd_info";
import AccountInfoForm from "~/components/profile/3_account_info";

export default function ProfilePage(
  props: InferPageProps<ProfilesController, "index"> & { profile: ParticipantProfile },
) {
  const { profile }: { profile: ParticipantProfile } = props;

  const [activeSection, setActiveSection] = useState(0);
  // TODO: Rework how sections are choosen
  const sections = ["Perfil", "Conta"]; // "Social"

  // TODO: Follow the github edit information page style, should be able to change profile image, email and password

  return (
    <Page title={`${profile.firstName} ${profile.lastName}`} variant="blue">
      <Container className="mt-8 min-h-screen max-w-7xl">
        <Card className="bg-enei-beige grid grid-cols-1 gap-16 rounded-[30px] px-0 md:grid-cols-[auto_1fr] md:px-0 min-h-[48rem]">
          <section className="outline-enei-blue hidden h-full w-[22rem] rounded-tr-[30px] bg-opacity-20 py-6 outline outline-4 md:block">
            <div className="sticky top-28">
              <p className="text-enei-blue mb-6 px-12 text-4xl font-bold">Definições</p>

              <ul className="text-enei-blue flex flex-col">
                {sections.map((name: string, idx: number) =>
                  idx === activeSection ? (
                    <li className="bg-enei-blue text-enei-beige relative flex h-[60px] items-center px-12 text-3xl font-bold">
                      {name}
                      <div
                        className={cn(
                          "bg-enei-blue border-enei-blue absolute -right-14 top-0 flex h-[62px] w-14 items-center justify-center rounded-r-full border-b-2",
                          idx === sections.length - 1 && "h-[60px]",
                        )}
                      >
                        <span className="bg-enei-beige block h-7 w-7 rounded-full" />
                      </div>
                    </li>
                  ) : (
                    <li
                      className="border-enei-blue flex h-[60px] cursor-pointer items-center border-t-2 px-12 text-3xl last:border-b-2"
                      onClick={() => setActiveSection(idx)}
                    >
                      {name}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-4 px-4 py-12">
            {activeSection === 0 && <ProfileInfoForm profile={profile} />}
            {activeSection === 1 && <AccountInfoForm />}
            {activeSection === 2 && <TbdInfoForm profile={profile} />}
          </section>
        </Card>
      </Container>
    </Page>
  );
}
