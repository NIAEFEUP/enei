import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
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
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import CurricularYearSelector from '../ui/form-build/curricular-year-input'

import universities from '#data/enei/universities.json' with { type: 'json' }
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { Input } from '../ui/input'
import { SignupInfo } from '~/pages/signup/schema'

const StudentInfoForm = () => {
  const form = useFormContext<SignupInfo>()

  const [openUniversityDropdown, setOpenUniversityDropdown] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-4">
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
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Procurar universidade..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma universidade encontrada</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-[300px]">
                          {universities.map((uni) => (
                            <CommandItem
                              key={uni.id}
                              value={uni.id}
                              onSelect={() => {
                                setSelectedUniversity(uni.id)
                                form.setValue(field.name, uni.id)
                                setOpenUniversityDropdown(false)
                              }}
                              className="flex cursor-pointer items-center justify-between text-sm"
                            >
                              <span>{uni.name}</span>
                              <Check
                                className={cn(
                                  'h-4 w-4',
                                  selectedUniversity === uni.id ? 'opacity-100' : 'opacity-0'
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
                defaultCurricularYear={form.getValues('curricularYear')}
                defaultLastYear={form.getValues('completedYear')}
                onCurricularYearChange={(curricularYear, lastYear) => {
                  form.setValue(field.name, curricularYear || '')
                  // TODO: Change this to ids/number instead of text
                  if (curricularYear == 'Já completei o curso') {
                    form.setValue('completedYear', lastYear || null)
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <StepperFormActions />
    </div>
  )
}

export default StudentInfoForm
