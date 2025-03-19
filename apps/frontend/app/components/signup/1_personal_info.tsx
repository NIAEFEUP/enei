import districts from '#data/enei/districts.json' with { type: 'json' }
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
import { PhoneInput } from '../ui/phone-input/phone-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '@enei/shadcn/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@enei/shadcn/ui/popover'
import { cn } from '@enei/utils/cn'
import { Calendar } from '@enei/shadcn/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { PersonalInfo, personalInfoSchema } from '#pages/signup/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai/react'
import { personalInfoAtom } from '#pages/signup/atoms'
import { useStepper } from '../ui/stepper'
import StepperFormActions from './actions'

const INITIAL_MONTH = new Date(2004, 0, 1)

const PersonalInfoForm = () => {
  const { nextStep } = useStepper()

  const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom)

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo || {
      firstName: '',
      lastName: '',
      phone: '',
    },
  })

  const onSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data)
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Primeiro Nome*</FormLabel>
                  <FormControl>
                    <Input placeholder="Joca" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Último Nome*</FormLabel>
                  <FormControl>
                    <Input placeholder="Costa" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                          <span>Seleciona uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialMonth={INITIAL_MONTH}
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={pt}
                    />
                  </PopoverContent>
                </Popover>
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
                  <PhoneInput
                    placeholder="923 456 789"
                    defaultCountry="PT"
                    locales="pt"
                    countryOptionsOrder={['PT', '...']}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Não incluas o código do país.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="municipality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Natural de*</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar distrito/região autónoma" />
                    </SelectTrigger>

                    <SelectContent>
                      {districts.map((dist) => {
                        return (
                          <SelectItem key={dist.id} value={dist.id}>
                            {dist.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Indica o distrito onde nasceste.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <StepperFormActions />
        </div>
      </form>
    </Form>
  )
}

export default PersonalInfoForm
