import BaseProfilePage, { BadgesSlot, BaseProfilePageProps } from "./page.base";
import { Badge } from "~/components/ui/badge";
import Company from "#models/company";

type Props = Omit<BaseProfilePageProps, "canEditProfile" | "profileName"> & {
  profile: Company;
};

export default function CompanyProfilePage(props: Props) {
  const { profile } = props;

  return (
    <BaseProfilePage
      canEditProfile={false}
      profileName={profile.name}
      avatarLogo={profile.logo}
      {...props}
    >
      <BadgesSlot>
        <div>
          <Badge variant={"default"}>Company</Badge>
        </div>
      </BadgesSlot>
    </BaseProfilePage>
  );
}
