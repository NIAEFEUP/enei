import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'

interface BillingInformationFormProps {
  enableBillingInfo: boolean
  setEnableBillingInfo: (checked: boolean) => void
  billingInfo: {
    name: string
    vat: string
    address: string
  }
  onBillingInfoChange: (field: string, value: string) => void
}

export default function BillingInformationForm({
  enableBillingInfo,
  setEnableBillingInfo,
  billingInfo,
  onBillingInfoChange,
}: BillingInformationFormProps) {
  const handleInputChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onBillingInfoChange(key, event.target.value)
  }
  return (
    <section>
      {/* Checkbox */}
      <h2 className="text-xl font-semibold mb-4">2. Dados de faturação</h2>
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="billingAddress"
          checked={enableBillingInfo}
          onCheckedChange={(checked) => setEnableBillingInfo(checked as boolean)}
        />
        <Label htmlFor="billingAddress">Incluir dados de faturação</Label>
      </div>

      {/* Billing information form */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder="Nome completo"
            disabled={!enableBillingInfo}
            value={billingInfo.name}
            onChange={handleInputChange('name')}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="vat">NIF</Label>
          <Input
            id="vat"
            placeholder="Número de identificação fiscal"
            disabled={!enableBillingInfo}
            value={billingInfo.vat}
            onChange={handleInputChange('vat')}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Morada</Label>
          <Input
            id="address"
            placeholder="Insere a tua morada"
            disabled={!enableBillingInfo}
            value={billingInfo.address}
            onChange={handleInputChange('address')}
          />
        </div>
      </div>
    </section>
  )
}
