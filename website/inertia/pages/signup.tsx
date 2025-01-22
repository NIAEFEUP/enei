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
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '~/components/ui/extension/multi-select'
import { Step, Stepper } from '~/components/ui/stepper'
import PersonalInfoForm from '~/components/register_form/1_personal_info'

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

const steps = [
  { label: "Informação Pessoal" },
  { label: "Informação de Estudante" },
  { label: "Informações de Logística" }, //TODO: (later) See how to make this optional
  { label: "Comunicação" },
]

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
      <p></p>
      <div className="flex flex-col gap-4 max-w-96 mx-auto text-enei-beige">
        <Stepper variant="circle-alt" initialStep={0} steps={steps} orientation="horizontal" responsive={true} size="md">

          {/* Content */}
          {steps.map((stepProps, index) => (
            <Step key={stepProps.label} {...stepProps}>
              {index === 0 && <PersonalInfoForm />}
            </Step>
          ))}
        </Stepper>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
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
