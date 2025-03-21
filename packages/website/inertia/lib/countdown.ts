export type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  miliseconds: number
}

const milisInSecond = 1000
const milisInMinute = 60 * milisInSecond
const milisInHour = 60 * milisInMinute
const milisInDay = 24 * milisInHour

function milisecondsToTimeLeft(miliseconds: number): TimeLeft {
  const days = Math.floor(miliseconds / milisInDay)
  miliseconds -= days * milisInDay

  const hours = Math.floor(miliseconds / milisInHour)
  miliseconds -= hours * milisInHour

  const minutes = Math.floor(miliseconds / milisInMinute)
  miliseconds -= minutes * milisInMinute

  const seconds = Math.floor(miliseconds / 1000)
  miliseconds -= seconds * 1000

  return {
    days,
    hours,
    minutes,
    seconds,
    miliseconds,
  }
}

export type CreateCountdownOptions = {
  utcTarget: number
  resolution?: number
  onChange: (timeLeft: TimeLeft) => void
}

export function createCountdown({
  utcTarget,
  onChange,
  resolution = 1000,
}: CreateCountdownOptions) {
  const controller = new AbortController()

  function tick() {
    const now = Date.now()
    const distance = Math.max(0, utcTarget - now)

    if (distance <= 0) {
      controller.abort('Countdown has ended')
    }

    onChange(milisecondsToTimeLeft(distance))
  }

  const id = setInterval(() => tick(), resolution)
  controller.signal.addEventListener('abort', () => clearInterval(id))

  // tick once so listeners are up-to-date
  tick()

  return { abort: AbortController.prototype.abort.bind(controller) }
}
