import * as z from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import StepperFormActions from './actions'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import MultipleSelector, { Option } from '../ui/multiple-selector'
import { Textarea } from '../ui/textarea'

import * as enei from '~/lib/enei'
import { useContext } from 'react'
import { FormContext } from '~/contexts/form_context'

const ENEI_EDITIONS: Option[] = enei.getPreviousEditions().map(({ year, location }) => {
  return {
    value: year.toString(),
    label: location + ', ' + year.toString(),
  }
})

const HEARD_ABOUT_FROM: Option[] = [
  { value: 'friends', label: 'Amigos' },
  { value: 'socialMedia', label: 'Redes' },
  { value: 'university', label: 'Banca' },
  { value: 'other', label: 'Outro' },
  { value: 'unknown', label: 'Já não me lembro' },
]

const CommunicationFormSchema = z.object({
  heardAboutENEI: z.string().min(1, { message: 'Seleciona uma opção' }),
  participationReason: z.string().optional(),
  reasonForSignup: z.string().optional(),
  attendedBefore: z.boolean(),
  attendedBeforeEditions: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: 'Tens de aceitar os termos e condições',
  }),
  photoConsent: z.boolean().refine((value) => value === true, {
    message: 'Tens de aceitar o consentimento',
  }),
})

const CommunicationInfoForm = () => {
  const form = useForm<z.infer<typeof CommunicationFormSchema>>({
    resolver: zodResolver(CommunicationFormSchema),
    defaultValues: {
      heardAboutENEI: '',
      participationReason: '',
      attendedBefore: false,
      termsAndConditions: false,
      photoConsent: false,
    },
  })

  const { formData, updateFormData } = useContext(FormContext)

  async function onSubmit() {
    const localData = form.getValues()
    ;(Object.keys(localData) as Array<keyof typeof localData>).forEach((key) => {
      updateFormData(key, localData[key])
    })

    console.log(formData)

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Success:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="heardAboutENEI"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Como ouviste falar do ENEI?</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    {HEARD_ABOUT_FROM.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <FormLabel>Qual a principal razão para te inscreveres no ENEI?</FormLabel>
              <FormControl>
                <Textarea
                  defaultValue={field.value}
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
          name="attendedBefore"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2 items-center">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <p>Já participaste em alguma edição do ENEI?</p>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('attendedBefore') && (
          <FormField
            control={form.control}
            name="attendedBeforeEditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Em qual edição?</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={ENEI_EDITIONS}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Sem resultados
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <p>Declaro que li e aceito todos os termos e condições do evento.</p>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoConsent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <p>
                  Declaro que posso ser fotografado e que a minha imagem pode ser utilizada para
                  publicações nas redes sociais do evento.
                </p>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <StepperFormActions />
      </form>
    </Form>
  )
}

export default CommunicationInfoForm
