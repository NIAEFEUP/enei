import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@enei/shadcn/ui/dialog";
import { Button } from "@enei/shadcn/ui/button";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function OrderConfirmationModal({ isOpen, onClose }: OrderConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação de Pedido</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Após realizares o pagamento, irás receber um email de confirmação.
        </DialogDescription>
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default OrderConfirmationModal;
