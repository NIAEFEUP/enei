import RegistrationConfirmationModal from "./registration_confirmation_modal";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import Event from "#models/event";
import { useToast } from "~/hooks/use_toast";
import { useForm } from "@inertiajs/react";
import { Dispatch } from "react";
import { SetStateAction } from "jotai/vanilla";

interface PointRegistrationConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  onClose: () => void;
  event: Event;
}

export default function PointsRegistrationConfirmationModal({
  isOpen,
  setIsOpen,
  isLoading,
  onClose,
  event,
}: PointRegistrationConfirmationModalProps) {
  const { post } = useForm({
    products: [],
  });

  const { toast } = useToast();

  const handleRegister = async () => {
    post(`/events/${event.id}/register`, {
      onSuccess: () => {
        setIsOpen(false);
        toast({
          title: "Sucesso",
          description: "Estás inscrito. Diverte-te!",
        });
      },
      onError: (errors) => {
        toast({
          title: "Erro ao registar",
          description:
            errors.message
            || "Ocorreu um erro ao registar para o evento. Por favor, tenta novamente.",
          duration: 5000,
        });
      },
    });
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
