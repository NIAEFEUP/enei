import axios from "axios";
import { useState } from "react";
import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import CredentialScanner from "~/components/credentials/scanner";
import ProfileInfoDrawer from "~/components/profile/profile_info_drawer";
import { useTuyau } from "~/hooks/use_tuyau";

export default function QrScanner() {
  const tuyau = useTuyau();

  const [profile, setProfile] = useState<any>(null);

  return (
    <Page title="QRCode Scanner" className="bg-enei-beige text-enei-blue" variant="beige">
      <Container className="max-w-xl">
        <div className="mx-auto flex w-3/4 flex-col gap-y-4">
          <h3 className="text-center text-lg font-bold">Dá scan ao qrcode</h3>
          <CredentialScanner
            onScan={(slug: string) => {
              axios.get(tuyau.$url("actions:profile.info", { params: { slug } })).then((res) => {
                setProfile(res.data.profile);
              });
            }}
          />
        </div>
        {profile && <ProfileInfoDrawer profile={profile} />}
      </Container>
    </Page>
  );
}
