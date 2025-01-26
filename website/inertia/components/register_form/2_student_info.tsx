import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useStepper } from '../ui/stepper'
import StepperFormActions from './actions'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import CurricularYearSelector from '../ui/form-build/curricular-year-input'

import universities from '#data/enei/universities.json' with { type: 'json' }
import { Check, ChevronsUpDown } from 'lucide-react'
import { useContext, useState } from 'react'
import { FormContext } from '~/contexts/form_context'
import { cn } from '~/lib/utils'
import { Input } from '../ui/input'

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
      { message: 'Seleciona um ano curricular' }
    )
    .refine(
      ([_, second]) => {
        return CurricularYearLastYearSchema.safeParse(second).success
      },
      { message: 'Ano de conclusão inválido' }
    )
    .refine(
      ([first, second]) => {
        // Second is optional unless the first value is "already-finished"
        if (first === 'already-finished') {
          return !!second
        }
        return true
      },
      { message: 'Introduz o ano de conclusão do curso' }
    ),
})

const StudentInfoForm = () => {
  const { nextStep } = useStepper()
  const { updateFormData, getValue } = useContext(FormContext)

  const form = useForm<z.infer<typeof StudentInfoSchema>>({
    resolver: zodResolver(StudentInfoSchema),
    defaultValues: {
      university: getValue('university') || '',
      course: getValue('course') || '',
      curricularYear: getValue('curricularYear') || ['', undefined],
    },
  })

  function onSubmit() {
    const localData = form.getValues()
    ;(Object.keys(localData) as Array<keyof typeof localData>).forEach((key) => {
      updateFormData(key, localData[key])
    })
    nextStep()
  }
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    getValue('university')
  )
  const [openUniversityDropdown, setOpenUniversityDropdown] = useState(false)

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
                <Popover open={openUniversityDropdown} onOpenChange={setOpenUniversityDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openUniversityDropdown}
                      className="w-full justify-between overflow-ellipsis font-normal"
                    >
                      {selectedUniversity ? (
                        <span className="w-full overflow-ellipsis overflow-hidden">
                          {selectedUniversity}
                        </span>
                      ) : (
                        <span>Selecionar Universidade...</span>
                      )}
                      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Procurar universidade..." />
                      <CommandList>
                        <CommandEmpty>Nenhuma universidade encontrada.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-[300px]">
                            {universities.map((uni) => (
                              <CommandItem
                                key={uni}
                                value={uni}
                                onSelect={() => {
                                  setSelectedUniversity(uni)
                                  form.setValue(field.name, uni)
                                  setOpenUniversityDropdown(false)
                                }}
                                className="flex cursor-pointer items-center justify-between text-sm"
                              >
                                <span>{uni}</span>
                                <Check
                                  className={cn(
                                    'h-4 w-4',
                                    selectedUniversity === uni ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                            <ScrollBar orientation="vertical" />
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                <Input
                  onChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Introduz o teu curso"
                />
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
              <FormLabel>Ano Curricular*</FormLabel>
              <FormControl>
                <CurricularYearSelector
                  defaultCurricularYear={getValue('curricularYear')[0]}
                  defaultLastYear={getValue('curricularYear')[1]}
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
