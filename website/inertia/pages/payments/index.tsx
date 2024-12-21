'use client'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { motion, AnimatePresence } from 'framer-motion'

const item = {
  title: 'Bilhete - Com alojamento',
  description:
    'Inclui: Pequenos-almoços, almoços e jantares durante o período do evento<br>Acesso a coffee breaks e sessão de cocktails\nAcesso a workshops, palestras e outros\nAcesso a festas noturnas e outras atividades recreativas (exceto Rally Tascas)\nAlojamento em Pavilhão',
  price: 35,
  img: 'favicon.svg',
}

export default function TicketSalePage() {
  const [showBillingAddress, setShowBillingAddress] = useState(false)

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Completa a tua compra</CardTitle>
          <CardDescription>Revê o teu bilhete e procede para o pagamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ticket Information */}
          <div className="flex items-start space-x-4">
            <img src={`/${item.img}`} alt="Item" className="w-16 h-16" />
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-lg font-bold mt-2">{item.price.toFixed(2)}€</p>
            </div>
          </div>

          {/* Toggle for showing the form */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="billingAddress"
              checked={showBillingAddress}
              onCheckedChange={(checked) => setShowBillingAddress(checked as boolean)}
            />
            <Label htmlFor="billingAddress">Incluir dados de faturação</Label>
          </div>

          {/* Billing information form */}
          <AnimatePresence>
            {showBillingAddress && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Collapsible open={showBillingAddress}>
                  <CollapsibleContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" placeholder="Nome completo" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="vat">NIF</Label>
                        <Input id="vat" placeholder="Número de identificação fiscal" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="address">Morada</Label>
                        <Input id="address" placeholder="Insere a tua morada" />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Pagar com referência multibanco</Button>
          <Button>Pagar com MBWay</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
