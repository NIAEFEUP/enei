import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '@enei/shadcn/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@enei/shadcn/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@enei/shadcn/ui/popover'
import CurricularYearSelector, { CurricularYearSelectorType } from './input/curricular_year_input'

import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@enei/utils/cn'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { EducationInfo, educationInfoSchema } from '#pages/signup/schema'
import { getUniversityById, universities } from '#lib/enei/signup/universities'
import { useMemo } from 'react'
import { useStepper } from '../ui/stepper'
import { useAtom, useSetAtom } from 'jotai/react'
import { educationInfoAtom } from '#pages/signup/atoms'
import StepperFormActions from './actions'

function UniversitySelection({ value }: { value?: string }) {
  const name = useMemo(() => value && getUniversityById(value)?.name, [value])

  return name ? (
    <span className="max-w-full overflow-ellipsis overflow-hidden">{name}</span>
  ) : (
    <span>Selecionar Universidade...</span>
  )
}

function EducationInfoForm() {
  const { nextStep } = useStepper()

  const setEducationInfo = useSetAtom(educationInfoAtom)
  const [educationInfo] = useAtom(educationInfoAtom)

  const form = useForm({
    resolver: zodResolver(educationInfoSchema),
    defaultValues: educationInfo || {
      university: '',
      course: '',
      curricularYear: ['1', null] as CurricularYearSelectorType,
    },
  })

  const onSubmit = (data: EducationInfo) => {
    setEducationInfo(data)
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Universidade/Faculdade*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between overflow-ellipsis font-normal"
                    >
                      <UniversitySelection value={field.value} />
                      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Procurar universidade..." />
                      <CommandList>
                        <CommandEmpty>Nenhuma universidade encontrada</CommandEmpty>
                        <CommandGroup>
                          {universities.map(({ id, name }) => (
                            <CommandItem
                              key={id}
                              value={name.toLowerCase()}
                              onSelect={() => form.setValue(field.name, id)}
                              className="flex cursor-pointer items-center justify-between text-sm"
                            >
                              <span>{name}</span>
                              <Check
                                className={cn(
                                  'h-4 w-4',
                                  field.value === id ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                    defaultValue={form.getValues('curricularYear')}
                    onCurricularYearChange={(curricularYear, lastYear) => {
                      form.setValue(field.name, [
                        curricularYear,
                        lastYear || null,
                      ] as CurricularYearSelectorType)
                    }}
                  />
                </FormControl>
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

export default EducationInfoForm
