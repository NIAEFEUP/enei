import * as z from 'zod'

import districts from '#data/location-input/districts.json' with { type: 'json' }
import { useForm } from 'react-hook-form'
import { useStepper } from '../ui/stepper'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { Input } from '../ui/input'
import StepperFormActions from './actions'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { PhoneInput } from '../ui/phone-input/phone-input'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

const PersonalInfoSchema = z.object({
  firstName: z.string().min(2, {
    message: 'O primeiro nome deve ter pelo menos 2 caracteres.',
  }),
  lastName: z.string().min(2, {
    message: 'O último nome deve ter pelo menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Insere um email válido',
  }),
  dateOfBirth: z.coerce
    .date({
      message: 'Insere uma data válida',
      errorMap: ({ code }, { defaultError }) => {
        if (code == 'invalid_date') return { message: 'Data inválida.' }
        return { message: defaultError }
      },
    })
    .min(new Date(Date.parse('1900-01-01')), { message: 'Data inválida, tem de ser mais recente.' })
    .max(new Date(), { message: 'Data inválida, tem de ser menor que a atual.' }),
  phone: z.string().regex(/^\+?[0-9\s-]{9,15}$/, {
    message: 'Insere um número de telemóvel válido.',
  }),
  municipality: z.string(),
})

const PersonalInfoForm = () => {
  const { nextStep } = useStepper()

  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: new Date(),
      phone: '',
      municipality: '',
    },
  })

  function onSubmit() {
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* TODO: Make it look good in mobile */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primeiro Nome*</FormLabel>
                  <FormControl>
                    <Input placeholder="Joca" type="text" {...field} />
                  </FormControl>

                  <FormDescription>
                    O teu primeiro e último nome vão ser visíveis no teu perfil.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Último Nome*</FormLabel>
                  <FormControl>
                    <Input placeholder="Costa" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento*</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={8}
                  pattern={REGEXP_ONLY_DIGITS}
                  onChange={(val) => {
                    form.setValue(
                      field.name,
                      new Date(Date.parse(`${val.slice(4)}-${val.slice(2, 4)}-${val.slice(0, 2)}`))
                    )
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} placeholder="D" />
                    <InputOTPSlot index={1} placeholder="D" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} placeholder="M" />
                    <InputOTPSlot index={3} placeholder="M" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} placeholder="Y" />
                    <InputOTPSlot index={5} placeholder="Y" />
                    <InputOTPSlot index={6} placeholder="Y" />
                    <InputOTPSlot index={7} placeholder="Y" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormDescription>
                A tua data de nascimento vai ser usada para determinar a tua idade.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input placeholder="participante@eneiconf.pt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Número de telemóvel*</FormLabel>
              <FormControl className="w-full">
                <PhoneInput placeholder="+351 923 456 789" {...field} defaultCountry="PT" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="municipality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Natural de</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar distrito/região autónoma" />
                  </SelectTrigger>

                  <SelectContent>
                    {districts.map((dist) => {
                      return (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Este é o concelho onde nasceste.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  )
}

export default PersonalInfoForm
