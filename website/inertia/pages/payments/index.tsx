'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { useState } from 'react'
import PhoneNumberModal from '~/components/payments/phone-modal'
import PurchaseSummary from '~/components/payments/purchase-summary'
import BillingInformationForm from '~/components/payments/billing-information-form'
import PaymentMethodSelector from '~/components/payments/payment-method-selector'
import axios from 'axios'

const item = {
  title: 'Bilhete - Com alojamento',
  description:
    'Inclui: Pequenos-almoços, almoços e jantares durante o período do evento<br>Acesso a coffee breaks e sessão de cocktails\nAcesso a workshops, palestras e outros\nAcesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas)\nAlojamento em Pavilhão',
  price: 35,
  image: 'favicon.svg',
}

export default function TicketSalePage() {
  const [enableBillingInfo, setEnableBillingInfo] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<string>('mbway')
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    vat: '',
    address: '',
  })

  const handlePaymentClick = () => {
    if (paymentMethod === 'mbway') {
      setPhoneModalOpen(true)
    } else {
      handleModalSubmit('')
    }
  }

  const handleModalSubmit = async (number: string) => {
    setPhoneNumber(number)
    setPhoneModalOpen(false)
    try {
      await axios.post('/payment/process', {
        phoneNumber: phoneNumber,
        paymentMethod: paymentMethod,
        billingInfo: enableBillingInfo ? billingInfo : null,
      })
    } catch (error) {
      console.error('Error processing the payment', error)
    }
  }

  const handleBillingInfoChange = (key: string, value: string) => {
    setBillingInfo({
      ...billingInfo,
      [key]: value,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Completa a tua compra</CardTitle>
          <CardDescription>Revê o teu bilhete e procede para o pagamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <PurchaseSummary item={item} />

          <Separator />

          <BillingInformationForm
            enableBillingInfo={enableBillingInfo}
            setEnableBillingInfo={setEnableBillingInfo}
            onBillingInfoChange={handleBillingInfoChange}
          />

          <Separator />

          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <Separator />

          <Button onClick={handlePaymentClick} disabled={!paymentMethod} className="w-full">
            Pagar
          </Button>

          <PhoneNumberModal
            isOpen={phoneModalOpen}
            onClose={() => setPhoneModalOpen(false)}
            onSubmit={handleModalSubmit}
          />
        </CardContent>
      </Card>
    </div>
  )
}
