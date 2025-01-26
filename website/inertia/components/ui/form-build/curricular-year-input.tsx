import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

interface CurricularYearProps {
  value: string
  label: string
}

interface CurricularYearSelectorProps {
  disabled?: boolean
  onCurricularYearChange?: (curricularYear: string | null, lastYear: number | null) => void
  defaultCurricularYear: string | null
  defaultLastYear: number | null
}

const CurricularYearSelector = ({
  disabled,
  onCurricularYearChange,
  defaultCurricularYear,
  defaultLastYear,
}: CurricularYearSelectorProps) => {
  const [selectedCurricularYear, setCurricularYear] = useState<string | null>(defaultCurricularYear)
  const [_, setSelectedLastYear] = useState<number | null>(defaultLastYear)

  const curricularYears: CurricularYearProps[] = [
    { value: '1', label: '1º ano' },
    { value: '2', label: '2º ano' },
    { value: '3', label: '3º ano' },
    { value: '4', label: '4º ano' },
    { value: '5', label: '5º ano' },
    { value: 'already-finished', label: 'Já terminei o curso' },
  ]
  const lastYearList: string[] = Array.from({ length: 75 }, (_, i) => (2024 - i).toString())

  const handleCurricularYearSelect = (curricularYear: string | null) => {
    setCurricularYear(curricularYear)
    setSelectedLastYear(null)
    onCurricularYearChange?.(curricularYear, null)
  }

  const handleLastYearSelect = (year: string | null) => {
    const numericYear: number | null = year ? parseInt(year, 10) : null
    setSelectedLastYear(numericYear)
    onCurricularYearChange?.(selectedCurricularYear, numericYear)
  }

  return (
    <div className="flex gap-4">
      {/* Curricular Year Selector */}
      <Select defaultValue={defaultCurricularYear || ''} onValueChange={handleCurricularYearSelect}>
        <SelectTrigger disabled={disabled}>
          <SelectValue placeholder="Ano Curricular" />
        </SelectTrigger>
        <SelectContent>
          {curricularYears.map((year) => (
            <SelectItem key={year.value} value={year.value}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* State Selector - Only shown if degree already finished */}
      {selectedCurricularYear === 'already-finished' && (
        <Select onValueChange={handleLastYearSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Ano de Conclusão" />
          </SelectTrigger>
          <SelectContent>
            {lastYearList.map((year) => (
              <SelectItem key={year} value={year}>
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
