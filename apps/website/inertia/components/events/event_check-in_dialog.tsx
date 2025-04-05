import {
  Dialog,
  DialogContent
} from "~/components/ui/dialog";
import CredentialScanner from "../credentials/scanner";
import { useTuyau } from "~/hooks/use_tuyau";
import { useForm } from "@inertiajs/react";
import { toast } from "~/hooks/use_toast";

interface EventCheckInDialogProps {
  isOpen: boolean;
  eventID: number;
  eventTitle: string;
  setOpen: (open: boolean) => void;
}


export default function EventCheckInDialog(
  {isOpen, eventID, eventTitle, setOpen} : EventCheckInDialogProps
) {
  if (!isOpen) {
    return null;
  }

  const tuyau = useTuyau();
  const { post } = useForm({
    eventID: eventID,
  });

  const handleCheckIN = (slug: string) => {
    post(tuyau.$url("actions:events.checkin", { params: { slug }}), {
      onSuccess: () => {
        toast({
          title: "Utilizador checked-in com sucesso",
          description: `${eventTitle}`,
          duration: 5000,
        });

        setOpen(false);
      },
      onError: () => {
        toast({
          title: "Erro ao dar check-in ao utilizador",
          description: `${eventTitle}`,
          duration: 5000,
        });

        setOpen(false);
      }
    })
  }

  return <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
    <DialogContent className="w-96 h-96">
      <CredentialScanner onScan={(slug) => handleCheckIN(slug)}/>
    </DialogContent>
  </Dialog>
}