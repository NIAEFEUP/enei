import * as z from 'zod'

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
import StepperFormActions from './actions'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import CurricularYearSelector from '../ui/form-build/curricular-year-input'

// HACK: This is because the tuple would return an array of errors
// this way they are validated individually
const CurricularYearSchema = z.string().min(1)
const CurricularYearLastYearSchema = z
  .number()
  .int()
  .min(1900)
  .max(new Date().getFullYear())
  .optional()

const StudentInfoSchema = z.object({
  university: z.string().min(1, { message: 'Seleciona uma universidade/faculdade' }),
  course: z.string().min(1, { message: 'Seleciona um curso' }),
  curricularYear: z
    .tuple([z.string(), z.number().optional()])
    .refine(
      ([first, _]) => {
        return CurricularYearSchema.safeParse(first).success
      },
      {
        message: 'Obrigatório',
      }
    )
    .refine(
      ([_, second]) => {
        return CurricularYearLastYearSchema.safeParse(second).success
      },
      {
        message: 'Ano de conclusão inválido',
      }
    )
    .refine(
      ([first, second]) => {
        // Second is optional unless the first value is "already-finished"
        if (first === 'already-finished') {
          return !!second
        }
        return true
      },
      {
        message: 'Introduz o ano de conclusão do curso.',
      }
    ),
})

const StudentInfoForm = () => {
  const { nextStep } = useStepper()

  const form = useForm<z.infer<typeof StudentInfoSchema>>({
    resolver: zodResolver(StudentInfoSchema),
    defaultValues: {
      university: '',
      course: '',
      curricularYear: ['', undefined],
    },
  })

  function onSubmit() {
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo de Universidade com Command */}
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Universidade/Faculdade*</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona a tua universidade/faculdade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="University A">University A</SelectItem>
                    <SelectItem value="University B">University B</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso*</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona o teu curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Course A">Course A</SelectItem>
                    <SelectItem value="Course B">Course B</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="curricularYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano Curricular</FormLabel>
              <FormControl>
                <CurricularYearSelector
                  onCurricularYearChange={(curricularYear, lastYear) => {
                    form.setValue(field.name, [curricularYear || '', lastYear || undefined])
                  }}
                />
              </FormControl>
              <FormDescription>
                Se já terminaste o curso, indica o ano de conclusão.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  )
}

export default StudentInfoForm
