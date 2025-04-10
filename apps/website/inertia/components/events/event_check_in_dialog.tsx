import { Dialog, DialogContent } from "~/components/ui/dialog";
import CredentialScanner from "../credentials/scanner";
import { useTuyau } from "~/hooks/use_tuyau";
import { useForm } from "@inertiajs/react";
import { toast } from "~/hooks/use_toast";

interface EventCheckInDialogProps {
  isOpen: boolean;
  eventID: number;
  setOpen: (open: boolean) => void;
}

export default function EventCheckInDialog({ isOpen, eventID, setOpen }: EventCheckInDialogProps) {
  if (!isOpen) {
    return null;
  }

  const tuyau = useTuyau();

  const { post } = useForm({
    eventID: eventID,
  });

  const handleCheckIN = (slug: string) => {
    try {
      post(tuyau.$url("actions:events.checkin", { params: { slug } }), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Check-in successful!",
          });
          setOpen(false);
        },
        onError: (errors) => {
          toast({
            title: "Error",
            description: errors.message || "Failed to check-in",
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
    <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
      <DialogContent className="h-96 w-96">
        <CredentialScanner onScan={(slug) => handleCheckIN(slug)} />
      </DialogContent>
    </Dialog>
  );
}
