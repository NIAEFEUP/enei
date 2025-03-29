import {
  Dialog,
  DialogContent
} from "~/components/ui/dialog";
import CredentialScanner from "./scanner";

interface ScannerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (slug: string) => void;
}


export default function DialogScanner(
  {isOpen, onClose, onScan} : ScannerDialogProps
) {
  if (!isOpen) {
    return null;
  }

  return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="w-96 h-96">
      <CredentialScanner onScan={(slug) => onScan(slug)}/>
    </DialogContent>
  </Dialog>
}