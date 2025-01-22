import { MaybePromise } from '@adonisjs/inertia/types'
import { useEffect, useMemo, useState } from 'react'

type UseCooldownProps = {
  seconds: number
  onThrottledActivation: () => MaybePromise<void>
}

type Throttler = {
  (): () => Promise<void>
  <O>(fn: () => MaybePromise<O>): () => Promise<O | undefined>
  <I, O>(fn: (arg: I) => MaybePromise<O>): () => Promise<O | undefined>
}

type UseCooldownResult = {
  throttle: Throttler
} & ({ active: true; secondsLeft: number } | { active: false; secondsLeft?: undefined })

export function useCooldown({ seconds, onThrottledActivation }: UseCooldownProps) {
  const [activatedAt, setActivatedAt] = useState<number>(0)

  const [secondsLeft, setSecondsLeft] = useState<number>(0)
  const active = useMemo(() => secondsLeft > 0, [secondsLeft])

  const throttle: Throttler = (fn?: Parameters<Throttler>[0]) => {
    return async <I, O>(arg?: I) => {
      if (active) {
        await onThrottledActivation()
      } else {
        setActivatedAt(Date.now())
        if (fn)
            return await fn(arg) as O
      }
    }
  }

  useEffect(() => {
    if (activatedAt === 0) {
      return
    }

    function updateSecondsLeft() {
      const newSecondsLeft = seconds - Math.floor((Date.now() - activatedAt) / 1000)
      if (newSecondsLeft < 0) {
        setActivatedAt(0)
        return
      }

      setSecondsLeft(newSecondsLeft)
    }

    updateSecondsLeft()
    const interval = setInterval(updateSecondsLeft, 1000)

    return () => clearInterval(interval)
  }, [activatedAt])

  const result = useMemo<UseCooldownResult>(() => {
    if (active) {
      return { active, secondsLeft, throttle }
    }

    return { active, throttle }
  }, [secondsLeft, throttle])

  return result
}
