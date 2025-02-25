import { TZDateMini } from '@date-fns/tz'
import { useCountdown } from '~/hooks/use_countdown'
import { useEnvironment } from '~/hooks/use_env'
import { cn } from '~/lib/utils'
import background from '~/images/background.jpeg'
import Page from '~/components/common/page'
import Hero from '~/components/common/hero'
import Container from '~/components/common/containers'
import { Notification } from '~/components/notifications'
import { Link } from '@tuyau/inertia/react'
import { buttonVariants } from '~/components/ui/button'
import { ArrowRight } from 'lucide-react'

function useUtcTarget() {
  return useEnvironment((env) =>
    new TZDateMini(env.INERTIA_PUBLIC_EVENT_COUNTDOWN_DATE, env.INERTIA_PUBLIC_TZ).getTime()
  )
}

function Countdown() {
  const utcTarget = useUtcTarget()
  const timeLeft = useCountdown({ utcTarget, resolution: 1000 })

  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-4 w-fit gap-4 mt-10 transition-opacity duration-1000',
        !timeLeft && 'opacity-0'
      )}
    >
      <div className="bg-enei-beige bg-opacity-[62%] w-24 md:w-32 text-center shadow-[0_4px_4px_rgba(0_0_0_/_25%)]">
        <p className="tabular-nums font-space-grotesk text-enei-blue text-4xl md:text-6xl font-bold mt-10 [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca]">
          {timeLeft?.days.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <p className="text-enei-blue text-base md:text-xl font-bold mt-5 mb-3 [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca]">
          DIAS
        </p>
      </div>
      <div className="bg-enei-beige bg-opacity-[62%] w-24 md:w-32 text-center shadow-[0_4px_4px_rgba(0_0_0_/_25%)]">
        <p className="tabular-nums font-space-grotesk text-enei-blue text-4xl md:text-6xl font-bold mt-10 [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca]">
          {timeLeft?.hours.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <p className="text-enei-blue text-base md:text-xl font-bold mt-5 mb-3 [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca]">
          HORAS
        </p>
      </div>

      <div className="bg-enei-beige bg-opacity-[62%] w-24 md:w-32 text-center shadow-[0_4px_4px_rgba(0_0_0_/_25%)]">
        <p className="tabular-nums font-space-grotesk text-enei-blue text-4xl md:text-6xl font-bold mt-10 [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca]">
          {timeLeft?.minutes.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <p className="text-enei-blue text-base md:text-xl font-bold mt-5 mb-3 [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca]">
          MINUTOS
        </p>
      </div>

      <div className="bg-enei-beige bg-opacity-[62%] w-24 md:w-32 text-center shadow-[0_4px_4px_rgba(0_0_0_/_25%)]">
        <p className="tabular-nums font-space-grotesk text-enei-blue text-4xl md:text-6xl font-bold mt-10 [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca]">
          {timeLeft?.seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <p className="text-enei-blue text-base md:text-xl font-bold mt-5 mb-3 [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca]">
          SEGUNDOS
        </p>
      </div>
    </div>
  )
}

function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 isolate mix-blend-plus-darker', className)}>
      <div className="relative size-full">
        <div className="absolute inset-0 bg-gradient-to-b from-enei-blue via-enei-blue/90 via-40% to-enei-beige" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
      </div>
    </div>
  )
}

function Background() {
  return (
    <div className="absolute inset-0 isolate -z-10">
      <div className="relative size-full">
        <BackgroundGradient className="z-10" />
        <img
          src={background}
          alt="Paisagem onde são visíveis o Rio Douro, a Ponte D. Luís I e a cidade do Porto"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Page title="Home">
      <Notification>
        <div className="bg-enei-beige px-4 py-4 bg-opacity-[62%] shadow-[0_4px_4px_rgba(0_0_0_/_25%)] text-enei-blue flex flex-col lg:flex-row gap-2 items-center justify-center">
            <p className='text-center lg:text-left'><span>🎉</span> Os bilhetes para o ENEI 2025 já estão disponíveis!{' '}</p>
            <Link
              route="pages:tickets"
              className={cn(buttonVariants({ variant: 'link' }), 'p-0 text-md h-fit')}
            >
              <p className='text-center'>Garante já o teu bilhete <ArrowRight className="inline-block" /></p>
            </Link>
        </div>
      </Notification>
      <Background />
      <Hero className="h-auto flex-grow">
        <Container>
          <section className="relative flex flex-col gap-8 md:justify-between z-10">
            <div className="flex-grow md:flex-grow-0 py-4 sm:py-24 lg:py-20">
              <h1 className="w-3/12 text-justify font-space-grotesk text-5xl font-bold tracking-tight text-enei-beige leading-[60px] md:leading-[90px] md:text-7xl ">
                <div className="block gap-10 flex-row sm:flex sm:gap-0 md:block md:gap-10 lg:flex lg:gap-0">
                  <p className="whitespace-nowrap lowercase [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                    Encontro&nbsp;
                  </p>
                  <p className="whitespace-nowrap lowercase [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                    Nacional de
                  </p>
                </div>
                <div className="block gap-10 flex-row sm:flex sm:gap-0 md:block md:gap-10 lg:flex lg:gap-0">
                  <p className="whitespace-nowrap lowercase [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                    Estudantes de&nbsp;
                  </p>
                  <p className="whitespace-nowrap lowercase [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                    Informática
                  </p>
                </div>
              </h1>
              <p className="text-2xl text-enei-beige mt-2 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] md:text-4xl">
                Porto 2025 | 11-14 de abril
              </p>
              <Countdown />
            </div>
          </section>
        </Container>
      </Hero>
    </Page>
  )
}
