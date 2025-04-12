import { Dialog, DialogContent } from "~/components/ui/dialog";
import CredentialScanner from "../credentials/scanner";
import { useTuyau } from "~/hooks/use_tuyau";
import { useForm } from "@inertiajs/react";
import { toast } from "~/hooks/use_toast";
import { useState } from "react";
import { boolean } from "zod";
import { Checkbox } from "../ui/checkbox";

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

  const { post, data, setData } = useForm<{
    eventID: number;
    exit: boolean;
  }>({
    eventID: eventID,
    exit: false,
  })

  const handleCheckIN = (slug: string) => {
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
      <DialogContent className="h-96 w-96">
        <div className="flex flex-row gap-x-4">
          <Checkbox
            id="exit-checkbox"
            checked={data.exit}
            onCheckedChange={(val: boolean) => setData("exit", val)}
          />
          <label
            htmlFor="exit-checkbox"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Saída na palestra
          </label>
        </div>
        <CredentialScanner onScan={(slug) => handleCheckIN(slug)} />
      </DialogContent>
    </Dialog>
  );
}
