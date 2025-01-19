'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { useState, useEffect } from 'react'
import PhoneNumberModal from '~/components/payments/phone-modal'
import PurchaseSummary from '~/components/payments/purchase-summary'
import BillingInformationForm from '~/components/payments/billing-information-form'
import PaymentMethodSelector from '~/components/payments/payment-method-selector'
import axios from 'axios'

const item = {
  title: 'Bilhete - Com alojamento',
  description:
    'Inclui:<br />• Pequenos-almoços, almoços e jantares durante o período do evento<br />• Acesso a coffee breaks e sessão de cocktails<br />• Acesso a workshops, palestras e outros<br />• Acesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas) <br />• Alojamento em Pavilhão',
  price: 35,
  image: 'favicon.svg',
}

export default function TicketSalePage() {
  const [enableBillingInfo, setEnableBillingInfo] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('mbway')
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    vat: '',
    address: '',
  })

  // Clear billing info when the component mounts (to prevent stale data)
  useEffect(() => {
    setBillingInfo({
      name: '',
      vat: '',
      address: '',
    })
    const loginUser = async () => {
      //simulate login
      try {
        const response = await axios.get('http://localhost:3333/login/1')
        console.log('Login successful:', response.data)
      } catch (error) {
        console.error('Error during login:', error)
      }
    }

    loginUser()
  }, [])

  // Handles the payment button click. If the payment method is MB Way, it opens the phone modal, otherwise it processes the payment
  const handlePaymentClick = () => {
    if (paymentMethod === 'mbway') {
      setPhoneModalOpen(true)
    } else {
      handleModalSubmit('')
    }
  }

  // Closes the modal (if open) and processes the payment
  const handleModalSubmit = async (number: string) => {
    if (phoneModalOpen) {
      if (!number) return
      setPhoneModalOpen(false)
    }
    try {
      await axios.post('/payment/mbway', {
        userId: 1,
        products: [{ productId: 1, quantity: 1 }],
        nif: enableBillingInfo ? billingInfo.vat : null,
        address: enableBillingInfo ? billingInfo.address : null,
        mobileNumber: number,
      })
    } catch (error) {
      console.error('Error processing the payment', error)
    }
  }

  // Updates the billing information when the user types
  const handleBillingInfoChange = (key: string, value: string) => {
    setBillingInfo({
      ...billingInfo,
      [key]: value,
    })
  }

  return (
    <div className="container mx-auto p-4 lg:my-10 ">
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
            billingInfo={billingInfo}
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
