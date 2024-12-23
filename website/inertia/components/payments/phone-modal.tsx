import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import React from 'react'
import { PhoneInput } from '../ui/phone-input'

interface PhoneNumberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (phoneNumber: string) => void
}

function PhoneNumberModal({ isOpen, onClose, onSubmit }: PhoneNumberModalProps) {
  const [phoneNumber, setPhoneNumber] = React.useState('')

  function handleSubmit() {
    setPhoneNumber(phoneNumber)
    onSubmit(phoneNumber)
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
        <p>Por favor, insira o seu número de telemóvel:</p>
        <PhoneInput
          onChange={(value) => setPhoneNumber(value || '')}
          value={phoneNumber}
          placeholder="Número de telemóvel"
        />
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PhoneNumberModal
