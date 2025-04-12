import Company from "#models/company";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import CredentialScanner from "~/components/credentials/scanner";
import ProfileInfoDrawer from "~/components/profile/profile_info_drawer";
import { toast } from "~/hooks/use_toast";
import { useTuyau } from "~/hooks/use_tuyau";

export default function RepresentativeQrScanner() {
  const tuyau = useTuyau();
  const [representativeProfile, setRepresentativeProfile] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const { post, setData } = useForm({
    eventID: null,
  });

  useEffect(() => {
    if (representativeProfile?.company?.event?.id) {
      setData('eventID', representativeProfile.company.event.id);
    }
  }, [representativeProfile]);

  useEffect(() => {
    axios
      .get(tuyau.$url("actions:representative.info"))
      .then((res) => {
        setRepresentativeProfile(res.data.representativeProfile);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Não foi possível carregar o perfil de representante",
        });
      });
  }, []);

  useEffect(() => {
    axios
      .get(tuyau.$url("actions:representative.info"))
      .then((res) => {
        setRepresentativeProfile(res.data.representativeProfile);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Não foi possível carregar o perfil de representante",
        });
      });
  }, []);
  
  const handleCheckIN = (slug: string) => {
    post(tuyau.$url("actions:events.checkin", { params: { slug } }), {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Participante adicionado à banca!",
        });
      },
      onError: (errors) => {
        toast({
          title: "Error",
          description: errors.message || "Erro ao adicionar o participante à banca",
        });
      },
    });
  };
  

  return (
    <Page title="QRCode Scanner" className="bg-enei-beige text-enei-blue" variant="beige">
      <Container className="max-w-xl">
        <div className="mx-auto flex w-3/4 flex-col gap-y-4">
          <h3 className="text-center text-lg font-bold">Dá scan ao qrcode</h3>
          <CredentialScanner
            onScan={(slug: string) => {
              handleCheckIN(slug);
              axios.get(tuyau.$url("actions:profile.info", { params: { slug } })).then((res) => {
                setProfile(res.data.profile);
              });
            }}
          />
        </div>
        {profile && <ProfileInfoDrawer profile={profile} onClose={() => setProfile(null)} />}
      </Container>
    </Page>
  );
}
