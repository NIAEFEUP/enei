import { useEffect, useState } from 'react'
import { createCountdown, type CreateCountdownOptions, type TimeLeft } from '~/lib/countdown'

export function useCountdown({
  utcTarget,
  resolution = 1000,
}: Omit<CreateCountdownOptions, 'onChange'>) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const countdown = createCountdown({ utcTarget, onChange: setTimeLeft, resolution })
    return () => countdown.abort('Countdown was unmounted')
  }, [utcTarget, resolution, setTimeLeft])

  return timeLeft
}
