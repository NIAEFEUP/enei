import RegistrationConfirmationModal from "./registration_confirmation_modal";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

interface PointRegistrationConfirmationModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  event: Event;
}

export default function PointsRegistrationConfirmationModal({
  isOpen,
  isLoading,
  onClose,
  event,
}: PointRegistrationConfirmationModalProps) {
  const handleRegister = async () => {
    // setIsLoading(true);
    // try {
    //     router.post("/events/" + eventId + "/register", undefined, {
    //         onFinish: () => fetchRegistrationStatus(),
    //     });
    // } catch (error) {
    //     console.error(error);
    //     if (error.response?.status === 302) {
    //         window.location.href = "/signup";
    //         return;
    //     }
    //     if (error.response?.status === 401) {
    //         window.location.href = "/auth/login";
    //         return;
    //     }
    //     toast({
    //         title: "Erro ao registar",
    //         description:
    //             error.response?.data?.message
    //             || "Ocorreu um erro ao registar para o evento. Por favor, tente novamente.",
    //         duration: 5000,
    //     });
    // } finally {
    //     await fetchRegistrationStatus();
    //     await fetchTicketsRemaining();
    //     setIsLoading(false);
    //     setRegistrationConfirmationModalOpen(false);
    // }
  };

  return (
    <RegistrationConfirmationModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleRegister}
    >
      <p className="leading-tight">
        Depois de te inscreveres, se precisares de cancelar a tua inscrição por algum motivo, terás
        de enviar um email para{" "}
        <a
          className={cn(buttonVariants({ variant: "link" }), "p-0")}
          href="mailto:geral@eneiconf.pt"
        >
          geral@eneiconf.pt
        </a>{" "}
        para cancelar a tua inscrição.
      </p>
    </RegistrationConfirmationModal>
  );
}
