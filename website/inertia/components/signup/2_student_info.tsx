import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import StepperFormActions from './actions'
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
import CurricularYearSelector from './input/curricular-year-input'

import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { EducationInfo, educationInfoSchema } from '~/pages/signup/schema'
import { getUniversityById, universities } from '~/lib/enei/signup/universities'
import { useMemo } from 'react'

function UniversitySelection({ value }: { value?: string }) {
  const name = useMemo(() => value && getUniversityById(value)?.name, [value])

  return name ? (
    <span className="max-w-full overflow-ellipsis overflow-hidden">
      {name}
    </span>
  ) : (
    <span>Selecionar Universidade...</span>
  )
}

function EducationInfoForm() {
  const form = useForm({
    resolver: zodResolver(educationInfoSchema),
    defaultValues: {
      university: '',
      course: '',
      curricularYear: ['', null] as const,
    },
  })

  const onSubmit = (data: EducationInfo) => {
    console.log(data)
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
                              value={id}
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
                    defaultCurricularYear={form.getValues('curricularYear')}
                    defaultLastYear={form.getValues('completedYear')}
                    onCurricularYearChange={(curricularYear, lastYear) => {
                      form.setValue(field.name, [curricularYear!, lastYear || null] as const)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" size="sm">
              Próximo
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default EducationInfoForm
