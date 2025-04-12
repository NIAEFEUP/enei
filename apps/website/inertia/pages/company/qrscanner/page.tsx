import { router, useForm } from "@inertiajs/react";
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

  const { data, post, setData } = useForm({
    eventID: null,
  });

  useEffect(() => {
    if (representativeProfile?.company?.event?.id) {
      setData("eventID", representativeProfile.company.event.id);
    }
  }, [representativeProfile]);

  useEffect(() => {
<<<<<<< HEAD
    console.log("hey");
||||||| parent of 745c2b0d ([no ci] fix: more descriptive message)
    console.log("hey")
=======
>>>>>>> 745c2b0d ([no ci] fix: more descriptive message)
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
    if (data.eventID === null) {
      toast({
        className: "bg-red-300 border border-red-400",
        title: "Erro",
        description: "Aconteceu um problema ao ler o código QR. Por favor, tente novamente. Se o problema persistir, entre em contato com a staff do evento.",
      });

      router.visit(document.location.href, { preserveState: false });
      return;
    }

    try {
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
            description: errors.message || "Participante já adicionado à banca!",
          });
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
      });
    }
  };

  return (
    <Page title="QRCode Scanner" className="bg-enei-beige text-enei-blue" variant="beige">
      <Container className="max-w-xl">
        <div className="mx-auto flex w-3/4 flex-col gap-y-4">
          <h3 className="text-center text-lg font-bold">Dá scan ao qrcode</h3>
          <CredentialScanner
            onScan={(slug: string) => {
              handleCheckIN(slug);
            }}
          />
        </div>
        {profile && <ProfileInfoDrawer profile={profile} onClose={() => setProfile(null)} />}
      </Container>
    </Page>
  );
}
