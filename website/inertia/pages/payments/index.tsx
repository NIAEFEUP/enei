'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { useState, useEffect } from 'react'
import { InferPageProps } from '@adonisjs/inertia/types'
import TicketsController from '#controllers/tickets_controller'
import PhoneNumberModal from '~/components/payments/phone-modal'
import PurchaseSummary from '~/components/payments/purchase-summary'
import BillingInformationForm from '~/components/payments/billing-information-form'
import Page from '~/components/common/page'
import axios from 'axios'

interface Ticket {
  name: string
  description: string
  price: number
  image: string
}

export default function TicketSalePage(
  props: InferPageProps<TicketsController, 'showPayment'> & { ticket: Ticket }
) {
  const [enableBillingInfo, setEnableBillingInfo] = useState(false)
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    vat: '',
    address: '',
  })
  const item = props.ticket

  // Clear billing info when the component mounts (to prevent stale data)
  useEffect(() => {
    setBillingInfo({
      name: '',
      vat: '',
      address: '',
    })
  }, [])

  // Handles the payment button click. If the payment method is MB Way, it opens the phone modal, otherwise it processes the payment
  const handlePaymentClick = () => {
    setPhoneModalOpen(true)
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
    <Page title="Compra de Bilhete" className="bg-enei-blue">
      <div className="min-h-screen flex items-center justify-center m-5">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Completa a tua compra</CardTitle>
            <CardDescription>Revê o teu bilhete e procede para o pagamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {item ? <PurchaseSummary item={item} /> : <p>Loading ticket details...</p>}
            <Separator />

            <BillingInformationForm
              enableBillingInfo={enableBillingInfo}
              setEnableBillingInfo={setEnableBillingInfo}
              billingInfo={billingInfo}
              onBillingInfoChange={handleBillingInfoChange}
            />

            <Button onClick={handlePaymentClick} className="w-full">
              Pagar com
              <img src="/images/mbway_black.svg" alt="MB Way" className="h-6 w-auto" />
            </Button>

            <PhoneNumberModal
              isOpen={phoneModalOpen}
              onClose={() => setPhoneModalOpen(false)}
              onSubmit={handleModalSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
