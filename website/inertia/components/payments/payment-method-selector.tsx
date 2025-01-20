import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Label } from '~/components/ui/label'

interface PaymentMethodSelectorProps {
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSelectorProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">3. Método de pagamento</h2>
      <RadioGroup  value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mbway" id="mbway" />
          <Label htmlFor="mbway">
            <img src="/images/mbway.svg" alt="MB Way" className={`w-20 h-20 m-1 p-1`} />
          </Label>
        </div>
        {/*
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
        */}
        <p className="text-gray-500 text-sm">Mais métodos de pagamento em breve...</p>
      </RadioGroup>
    </section>
  )
}
