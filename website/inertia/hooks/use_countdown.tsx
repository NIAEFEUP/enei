import { useEffect, useState } from 'react'
import { createCountdown, CreateCountdownOptions, TimeLeft } from '~/lib/countdown'

export function useCountdown({
  utcTarget,
  resolution = 1000,
}: Omit<CreateCountdownOptions, 'onChange'>) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: 0,
  })

  useEffect(() => {
    const countdown = createCountdown({ utcTarget, onChange: setTimeLeft, resolution })
    return () => countdown.abort('Countdown was unmounted')
  }, [utcTarget, resolution, setTimeLeft])

  return timeLeft
}
