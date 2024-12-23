'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'

const item = {
  title: 'Bilhete - Com alojamento',
  description:
    'Inclui: Pequenos-almoços, almoços e jantares durante o período do evento<br>Acesso a coffee breaks e sessão de cocktails\nAcesso a workshops, palestras e outros\nAcesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas)\nAlojamento em Pavilhão',
  price: 35,
  image: 'favicon.svg',
}


export default function TicketSalePage() {
  const [enableBillingAddress, setEnableBillingAddress] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<string>('mbway')
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePaymentClick = () => {
    setPhoneModalOpen(true);
  }

  const handleModalClose = () => {
    setPhoneModalOpen(false);
  }

  const handleModalSubmit = () => {
    console.log("Phone number: ", phoneNumber);
    handleModalClose();
  }


  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Completa a tua compra</CardTitle>
          <CardDescription>Revê o teu bilhete e procede para o pagamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Revê a tua compra</h2>
            <div className="flex items-start space-x-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-[150px] h-[100px] object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-lg font-bold mt-2">{item.price.toFixed(2)}€</p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            {/* Checkbox */}
            <h2 className="text-xl font-semibold mb-4">2. Dados de faturação</h2>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="billingAddress"
                checked={enableBillingAddress}
                onCheckedChange={(checked) => setEnableBillingAddress(checked as boolean)}
              />
              <Label htmlFor="billingAddress">Incluir dados de faturação</Label>
            </div>

            {/* Billing information form */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Nome completo" disabled={!enableBillingAddress} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vat">NIF</Label>
                <Input
                  id="vat"
                  placeholder="Número de identificação fiscal"
                  disabled={!enableBillingAddress}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Morada</Label>
                <Input
                  id="address"
                  placeholder="Insere a tua morada"
                  disabled={!enableBillingAddress}
                />
              </div>
            </div>
          </section>
          <Separator />
          <section>
            <h2 className="text-xl font-semibold mb-4">3. Método de pagamento</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mbway" id="mbway" />
                <Label htmlFor="mbway">
                  <img src="/images/mbway.svg" alt="MB Way" className={`w-20 h-20 m-1 p-1`} />
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="atm" id="atm" />
                <Label htmlFor="atm">
                  <img
                    src="/images/multibanco.svg"
                    alt="Referência Multibanco"
                    className={`w-16 h-16 p-1`}
                  />
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="extra" id="extra" className="disabled" />
                <p>Mais métodos de pagamento em breve...</p>
              </div>
            </RadioGroup>
          </section>

          <Separator />

          <Button onClick={() => {}} disabled={!paymentMethod} className="w-full">
            Pagar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
