'use client'
import { useState } from 'react'
import { toast } from '~/hooks/use_toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Calendar } from '~/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-react'
import { PhoneInput } from '~/components/ui/phone-input/phone-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import LocationSelector from '~/components/ui/form-build/location-input'
import BaseLayout from '~/components/layouts/base'
import { Textarea } from '~/components/ui/textarea'
import { pt } from 'date-fns/locale'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '~/components/ui/extension/multi-select'
import * as enei from '~/lib/enei'

const previousEditions = enei.getPreviousEditions()

const errorMapPt = {
  required_error: "Obrigatório",
}

const formSchema = z.object({
  firstName: z.string(errorMapPt),
  lastName: z.string(errorMapPt),
  dateOfBirth: z.coerce.date(errorMapPt),
  phone: z.string(errorMapPt),
  cityOfOrigin: z.string(errorMapPt),
  university: z.string(errorMapPt),
  major: z.string(errorMapPt),
  curricularYear: z.tuple([z.string(errorMapPt), z.string().optional()]),
  tshirtSize: z.string(errorMapPt),
  dietType: z.string(errorMapPt),
  dietaryRestrictions: z.string(errorMapPt),
  transport: z.string(errorMapPt),
  infoSource: z.string(errorMapPt),
  reasonForSignup: z.string(errorMapPt),
  previousParticipations: z.array(z.string(errorMapPt)),
})

export default function Signup() {
  const [countryName, setCountryName] = useState<string>('')
  const [stateName, setStateName] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: new Date(),
      previousParticipations: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast({
        title: 'Form submitted',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(values, null, 2)}</code>
          </pre>
        ),
      })
    } catch (error) {
      console.error('Form submission error', error)
      toast({ title: 'Error', description: 'Failed to submit the form. Please try again.' })
    }
  }

  return (
    <BaseLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primeiro Nome</FormLabel>
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
                    <FormLabel>Último Nome</FormLabel>
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
              <FormItem className="flex flex-col">
                <FormLabel>Data de Nascimento</FormLabel>
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
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Número de telemóvel</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput placeholder="Placeholder" {...field} defaultCountry="PT" />
                </FormControl>
                {/* <FormDescription>Enter your phone number.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cityOfOrigin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naturalidade</FormLabel>

                <FormControl>
                  <Input placeholder="Vila Nova de Gaia" type="text" {...field} />
                </FormControl>

                <FormDescription>Este é o concelho onde nasceste.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Universidade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your email settings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="text" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="curricularYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curricular Year</FormLabel>
                <FormControl>
                  <LocationSelector
                    onCountryChange={(country) => {
                      setCountryName(country?.name || '')
                      form.setValue(field.name, [country?.name || '', stateName || ''])
                    }}
                    onStateChange={(state) => {
                      setStateName(state?.name || '')
                      form.setValue(field.name, [countryName || '', state?.name || ''])
                    }}
                  />
                </FormControl>
                <FormDescription>
                  If your country has states, it will be appear after selecting country
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tshirtSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>T-Shirt Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your email settings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dietType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diet type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your email settings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dietaryRestrictions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restrições alimentares</FormLabel>
                <FormControl>
                  <Input placeholder="Glúten, lactose..." type="text" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meio de Transporte</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Transporte..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bus">Autocarro</SelectItem>
                    <SelectItem value="coach">Camioneta</SelectItem>
                    <SelectItem value="car">Carro</SelectItem>
                    <SelectItem value="metro">Metro</SelectItem>
                    <SelectItem value="train">Comboio</SelectItem>
                    <SelectItem value="foot">A pé</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Escolhe o transporte que vais usar para chegar ao evento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reasonForSignup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Como ouviste falar do ENEI?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Amigos, redes sociais..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reasonForSignup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Porque é que escolheste inscrever-te no ENEI?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Aprender novas tecnologias, melhorar soft skills..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousParticipations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edições passadas em que participaste</FormLabel>
                <FormControl>
                  <MultiSelector
                    values={field.value}
                    onValuesChange={field.onChange}
                    loop
                    className="max-w-xs"
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Escolhe edições" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {previousEditions.map((edition) => (
                          <MultiSelectorItem key={edition.year} value={`ENEI ${edition.year}`}>
                            ENEI {edition.year} - {edition.location}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                </FormControl>
                <FormDescription>
                  Podes escolher uma ou mais edições em que já tenhas participado.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </BaseLayout>
  )
}
