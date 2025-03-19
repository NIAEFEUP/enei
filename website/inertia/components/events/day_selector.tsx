import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

interface DaySelectorProps {
  activeIndex: number
  setActiveIndex: (index: number) => void
  days: String[]
}

export function DaySelector({ activeIndex, setActiveIndex, days }: DaySelectorProps) {
  console.log(activeIndex)
  return (
    <div className="flex flex-row space-x-3">
      {days.map((day, index) => (
        <Button
          key={index}
          className={cn('text-enei-beige transition-all duration-300', index === activeIndex ? 'font-bold' : 'opacity-50')}
          onClick={() => setActiveIndex(index)}
        >
          Dia {index + 1}
          {index === activeIndex ? ' - ' + day : ''}
        </Button>
      ))}
    </div>
  )
}
