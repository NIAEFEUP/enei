import { Dialog, DialogContent } from "~/components/ui/dialog";
import CredentialScanner from "../credentials/scanner";
import { useTuyau } from "~/hooks/use_tuyau";
import { useForm } from "@inertiajs/react";
import { toast } from "~/hooks/use_toast";
import { Checkbox } from "../ui/checkbox";
import { useCallback, useState } from "react";

interface EventCheckInDialogProps {
  isOpen: boolean;
  eventID: number;
  setOpen: (open: boolean) => void;
}

export default function EventCheckInDialog({ isOpen, eventID, setOpen }: EventCheckInDialogProps) {
  const tuyau = useTuyau();

  const [exit, setExit] = useState(false);

  const { post, transform } = useForm({});

  transform(() => ({
    eventID,
    exit,
  }));

  const handleCheckIN = useCallback(
    (slug: string) => {
      try {
        post(tuyau.$url("actions:events.checkin", { params: { slug } }), {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Check-in successful!",
            });
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
    },
    [tuyau, post],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
      <DialogContent className="h-96 w-96">
        <div className="flex flex-row gap-x-4">
          <Checkbox
            id="exit-checkbox"
            checked={exit}
            onCheckedChange={(val: boolean) => setExit(val)}
          />
          <label
            htmlFor="exit-checkbox"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Saída na palestra
          </label>
        </div>
        <CredentialScanner onScan={handleCheckIN} />
      </DialogContent>
    </Dialog>
  );
}
