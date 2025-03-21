import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Loader2 } from 'lucide-react'

interface RegistrationConfirmationModalProps {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onSubmit: () => void
}

function RegistrationConfirmationModal({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: RegistrationConfirmationModalProps) {
  function handleSubmit() {
    onSubmit()
  }

  if (!isOpen) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Após confirmar a tua inscrição terás de contactar{' '}
          <Button className="p-0" variant="link">
            <a href="mailto:geral@eneiconf.pt">geral@eneiconf.pt</a>
          </Button>{' '}
          para cancelar a tua inscrição
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
  )
}

export default RegistrationConfirmationModal
