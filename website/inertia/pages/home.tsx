import AppLayout from '../layouts/applayout'
import { TZDateMini } from '@date-fns/tz'
import { useCountdown } from '~/hooks/use_countdown'
import { useEnvironment } from '~/hooks/use_env'
import { cn } from '~/lib/utils'

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

export default function Home() {
  return (
    <>
      <AppLayout title="Home" className="flex">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B4F6C_7%] to-enei-beige h-[100vh]" />
        <div
          className="absolute inset-0 bg-[url('/images/background.jpeg')] bg-cover bg-no-repeat bg-bottom md:bg-center
        z-2 opacity-40 [mask:_linear-gradient(transparent_5%,_black,_transparent_92%)]"
        />
        <section className="grow relative flex flex-col gap-8 px-6 overflow-x-hidden sm:px-12 md:px-24 lg:px-36 py-4 sm:py-24 lg:py-32 md:justify-between z-10">
          <div className="flex-grow md:flex-grow-0">
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
            <p className="font-space-grotesk font-normal text-2xl text-enei-beige mt-2 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] md:text-4xl">
              Porto 2025 | 11-14 de abril
            </p>
            <Countdown />
          </div>
          {/* <div className="mx-auto h-full flex justify-center items-center">
            <p className="w-48 h-fit bg-enei-beige p-2.5 px-8 text-center font-space-grotesk text-lg font-bold text-enei-blue uppercase rounded-md shadow-[0_4px_4px_rgba(0_0_0_/_25%)]">
              Brevemente
            </p>
          </div> */}
        </section>
      </AppLayout>
    </>
  )
}
