import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button, buttonVariants } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

interface RegistrationConfirmationModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function RegistrationConfirmationModal({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: RegistrationConfirmationModalProps) {
  function handleSubmit() {
    onSubmit();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="leading-tight">
            Depois de te inscreveres, se precisares de cancelar a tua inscrição por algum motivo,
            terás de enviar um email para{" "}
            <a
              className={cn(buttonVariants({ variant: "link" }), "p-0")}
              href="mailto:geral@eneiconf.pt"
            >
              geral@eneiconf.pt
            </a>{" "}
            para cancelar a tua inscrição.
          </p>
        </DialogDescription>
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading && <Loader2 className="animate-spin" />}
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RegistrationConfirmationModal;
