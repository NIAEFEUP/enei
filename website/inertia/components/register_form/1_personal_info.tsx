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
import { Input } from '../ui/input'
import StepperFormActions from './actions'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { pt } from 'date-fns/locale'
import { cn } from '~/lib/utils'
import { format } from 'date-fns'
import { PhoneInput } from '../ui/phone-input/phone-input'

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
  dateOfBirth: z.coerce.date({
    message: 'Insere uma data válida',
  }),
  phone: z.string().regex(/^\+?[0-9\s-]{9,15}$/, {
    message: 'Insere um número de telemóvel válido',
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
        {/* FIX: This calendar is not ideal for choosing the year */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Nascimento*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: pt })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={pt}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
              <FormLabel>Número de telemóvel</FormLabel>
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
