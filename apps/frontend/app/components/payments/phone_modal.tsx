import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from '@enei/shadcn/ui/dialog'
import { Button } from '@enei/shadcn/ui/button'
import { useState } from 'react'
import { PhoneInput } from '@enei/shadcn/ui/phone-input'
import { Loader2 } from 'lucide-react'

interface PhoneNumberModalProps {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onSubmit: (phoneNumber: string) => void
}

function PhoneNumberModal({ isOpen, isLoading, onClose, onSubmit }: PhoneNumberModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')

  function handleSubmit() {
    // TODO improve this validation
    if (!phoneNumber || phoneNumber.length < 9 || phoneNumber.length > 16) {
      setError('Por favor, insere um número de telemóvel válido')
      return
    }
    setError('')
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
        <DialogDescription>Por favor, insire o teu número de telemóvel:</DialogDescription>
        <PhoneInput
          defaultCountry="PT"
          countries={['PT']}
          onChange={(value) => {
            setPhoneNumber(value || '')
            setError('')
          }}
          value={phoneNumber}
          placeholder="Número de telemóvel"
        />
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
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

export default PhoneNumberModal
