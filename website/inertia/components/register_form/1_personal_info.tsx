import districts from '#data/enei/districts.json' with { type: 'json' }
import {
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
// import { useStepper } from '../ui/stepper'
import StepperFormActions from './actions'
import { SignupInfo } from '../../pages/signup/schema'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'
import { Calendar } from '~/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { useFormContext } from 'react-hook-form'

const PersonalInfoForm = () => {
  // const { nextStep } = useStepper()
  const form = useFormContext<SignupInfo>()

  return (
    <>
      {/* TODO: Make it look good in mobile */}
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
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
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
                        <SelectItem key={dist.id} value={dist.id}>
                          {dist.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Concelho onde nasceste</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </div>
    </>
  )
}

export default PersonalInfoForm
