import { cva, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

export type CurricularYearSelectorType =
  | ['1' | '2' | '3' | '4' | '5', null]
  | ['already-finished', number]

interface CurricularYearProps {
  value: string
  label: string
}

interface CurricularYearSelectorProps {
  disabled?: boolean
  onCurricularYearChange?: (curricularYear: string | null, lastYear: number | null) => void
  defaultValue: CurricularYearSelectorType,
}

const LAST_YEAR_LIST = Array.from({ length: 75 }, (_, i) => (2025 - i).toString())

const inputVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'bg-white text-enei-blue',
        blue: 'bg-enei-blue text-enei-beige border-enei-blue',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const inputContentVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'bg-white text-enei-blue',
        blue: 'bg-enei-blue text-enei-beige focus:bg-enei-beige focus:text-enei-blue',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const CurricularYearSelector = ({
  disabled,
  onCurricularYearChange,
  defaultValue,
  variant,
}: CurricularYearSelectorProps & VariantProps<typeof inputVariants & typeof inputContentVariants>) => {
  const [selectedCurricularYear, setCurricularYear] = useState<string | null>(defaultValue[0])
  const [, setSelectedLastYear] = useState<number | null>(defaultValue[1])

  const curricularYears: CurricularYearProps[] = [
    { value: '1', label: '1º ano' },
    { value: '2', label: '2º ano' },
    { value: '3', label: '3º ano' },
    { value: '4', label: '4º ano' },
    { value: '5', label: '5º ano' },
    { value: 'already-finished', label: 'Já terminei o curso' },
  ]

  const handleCurricularYearSelect = (curricularYear: string | null) => {
    setCurricularYear(curricularYear)
    setSelectedLastYear(null)
    onCurricularYearChange?.(curricularYear, null)
  }

  const handleLastYearSelect = (year: string | null) => {
    const numericYear: number | null = year ? Number.parseInt(year, 10) : null
    setSelectedLastYear(numericYear)
    onCurricularYearChange?.(selectedCurricularYear, numericYear)
  }

  return (
    <div className="flex gap-4">
      {/* Curricular Year Selector */}
      <Select defaultValue={defaultValue[0] || ''} onValueChange={handleCurricularYearSelect}>
        <SelectTrigger disabled={disabled} className={inputVariants({ variant })}>
          <SelectValue placeholder="Ano Curricular" />
        </SelectTrigger>
        <SelectContent className={inputVariants({ variant })}>
          {curricularYears.map((year) => (
            <SelectItem key={year.value} value={year.value} className={inputContentVariants({ variant })}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* State Selector - Only shown if degree already finished */}
      {selectedCurricularYear === 'already-finished' && (
        <Select defaultValue={defaultValue[1]?.toString()} onValueChange={handleLastYearSelect}>
          <SelectTrigger className={inputVariants({ variant })}>
            <SelectValue placeholder="Ano de Conclusão" />
          </SelectTrigger>
          <SelectContent className={inputVariants({ variant })}>
            {LAST_YEAR_LIST.map((year) => (
              <SelectItem key={year} value={year} className={inputContentVariants({ variant })}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}

export default CurricularYearSelector
