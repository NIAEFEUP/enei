import axios from "axios";
import { useState } from "react";
import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import Scanner from "~/components/credentials/scanner";
import ProfileInfoDrawer from "~/components/profile/profile_info_drawer";
import { useTuyau } from "~/hooks/use_tuyau";

export default function CredentialScanner() {
  const tuyau = useTuyau();

  const [user, setUser] = useState<any>(null);

  return (
    <Page title="Scan de Credenciais" className="bg-enei-beige text-enei-blue" variant="beige">
      <Container className="max-w-xl">
        <div className="mx-auto flex w-3/4 flex-col gap-y-4">
          <h3 className="text-center text-lg font-bold">Dá scan à credencial</h3>
          <Scanner
            onScan={(slug: string) => {
              axios.get(tuyau.$url("actions:profile.info", { params: { slug } })).then((res) => {
                setUser(res.data.user);
              });
            }}
          />
        </div>
        {user && <ProfileInfoDrawer user={user} onClose={() => setUser(null)} />}
      </Container>
    </Page>
  );
}
