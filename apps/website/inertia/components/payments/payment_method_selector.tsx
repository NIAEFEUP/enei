import { RadioGroup, RadioGroupItem } from "@enei/shadcn/ui/radio-group";
import { Label } from "@enei/shadcn/ui/label";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSelectorProps) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">3. Método de pagamento</h2>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mbway" id="mbway" />
          <Label htmlFor="mbway">
            <img src="/images/mbway_white.svg" alt="MB Way" className={`m-1 h-20 w-20 p-1`} />
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
      </RadioGroup>
    </section>
  );
}
