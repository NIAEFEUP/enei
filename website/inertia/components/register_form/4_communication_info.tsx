import { useFormContext } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import MultipleSelector, { Option } from '../ui/multiple-selector'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import StepperFormActions from './actions'

import editions from '#data/enei/editions.json' with { type: 'json' }
import { SignupInfo } from '~/pages/signup/schema'

const ENEI_EDITIONS: Option[] = editions.map(({ year, location }) => {
  return {
    label: location + ', ' + year.toString(),
    value: year.toString(),
  }
})

const HEARD_ABOUT_FROM: Option[] = [
  { value: 'friends', label: 'Amigos' },
  { value: 'socialMedia', label: 'Redes' },
  { value: 'university', label: 'Banca' },
  { value: 'other', label: 'Outro' },
  { value: 'unknown', label: 'Já não me lembro' },
]

const CommunicationInfoForm = () => {
  const form = useFormContext<SignupInfo>()

  return (
    <>
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
    </>
  )
}

export default CommunicationInfoForm
