import { TZDateMini } from "@date-fns/tz";
import { useCountdown } from "~/hooks/use_countdown";
import { useEnvironment } from "~/hooks/use_env";
import { cn } from "~/lib/utils";
import background from "~/images/background.jpeg";
import Page from "~/components/common/page";
import Hero from "~/components/common/hero";
import Container from "~/components/common/containers";
import ReasonsToEnroll from "~/components/home/reasons_to_enroll";
import Highlights from "~/components/home/highlights/highlights";
import Statistics from "~/components/home/statistics";
import Partners from "~/components/home/partners/partners";

function useUtcTarget() {
  return useEnvironment((env) =>
    new TZDateMini(env.INERTIA_PUBLIC_EVENT_COUNTDOWN_DATE, env.INERTIA_PUBLIC_TZ).getTime(),
  );
}

function Countdown() {
  const utcTarget = useUtcTarget();
  const timeLeft = useCountdown({ utcTarget, resolution: 1000 });

  return (
    <div
      className={cn(
        "mt-10 grid w-fit grid-cols-2 gap-4 transition-opacity duration-1000 sm:grid-cols-4",
        !timeLeft && "opacity-0",
      )}
    >
      <div className="bg-enei-beige w-24 bg-opacity-[62%] text-center shadow-[0_4px_4px_rgba(0_0_0_/_25%)] md:w-32">
        <p className="font-space-grotesk text-enei-blue mt-10 text-4xl font-bold tabular-nums [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca] md:text-6xl">
          {timeLeft?.days.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <p className="text-enei-blue mb-3 mt-5 text-base font-bold [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca] md:text-xl">
          DIAS
        </p>
      </div>
      <div className="bg-enei-beige w-24 bg-opacity-[62%] text-center shadow-[0_4px_4px_rgba(0_0_0_/_25%)] md:w-32">
        <p className="font-space-grotesk text-enei-blue mt-10 text-4xl font-bold tabular-nums [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca] md:text-6xl">
          {timeLeft?.hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <p className="text-enei-blue mb-3 mt-5 text-base font-bold [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca] md:text-xl">
          HORAS
        </p>
      </div>

      <div className="bg-enei-beige w-24 bg-opacity-[62%] text-center shadow-[0_4px_4px_rgba(0_0_0_/_25%)] md:w-32">
        <p className="font-space-grotesk text-enei-blue mt-10 text-4xl font-bold tabular-nums [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca] md:text-6xl">
          {timeLeft?.minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <p className="text-enei-blue mb-3 mt-5 text-base font-bold [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca] md:text-xl">
          MINUTOS
        </p>
      </div>

      <div className="bg-enei-beige w-24 bg-opacity-[62%] text-center shadow-[0_4px_4px_rgba(0_0_0_/_25%)] md:w-32">
        <p className="font-space-grotesk text-enei-blue mt-10 text-4xl font-bold tabular-nums [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca] md:text-6xl">
          {timeLeft?.seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <p className="text-enei-blue mb-3 mt-5 text-base font-bold [text-shadow:_-1px_0_#efe3ca,_0_1px_#efe3ca,_1px_0_#efe3ca,_0_-1px_#efe3ca] md:text-xl">
          SEGUNDOS
        </p>
      </div>
    </div>
  );
}

function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 isolate mix-blend-plus-darker", className)}>
      <div className="relative size-full">
        <div className="from-enei-blue via-enei-blue/90 to-enei-beige absolute inset-0 bg-gradient-to-b via-40%" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute inset-0 isolate h-screen">
      <div className="relative size-full">
        <BackgroundGradient className="z-10" />
        <img
          src={background}
          alt="Paisagem onde são visíveis o Rio Douro, a Ponte D. Luís I e a cidade do Porto"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Page title="Home" background="beige">
      <Background />
      <Hero className="relative h-screen flex-grow">
        <Container className="pb-32">
          <section className="relative z-10 flex flex-col gap-8 md:justify-between">
            <div className="flex-grow py-4 sm:py-24 md:flex-grow-0 lg:py-20">
              <h1 className="font-space-grotesk text-enei-beige w-3/12 text-justify text-5xl font-bold leading-[60px] tracking-tight md:text-7xl md:leading-[90px]">
                <div className="block flex-row gap-10 sm:flex sm:gap-0 md:block md:gap-10 lg:flex lg:gap-0">
                  <p className="whitespace-nowrap lowercase [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                    Encontro&nbsp;
                  </p>
                  <p className="whitespace-nowrap lowercase [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                    Nacional de
                  </p>
                </div>
                <div className="block flex-row gap-10 sm:flex sm:gap-0 md:block md:gap-10 lg:flex lg:gap-0">
                  <p className="whitespace-nowrap lowercase [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                    Estudantes de&nbsp;
                  </p>
                  <p className="whitespace-nowrap lowercase [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                    Informática
                  </p>
                </div>
              </h1>
              <p className="text-enei-beige mt-2 text-2xl [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] md:text-4xl">
                Porto 2025 | 11-14 de abril
              </p>
            </div>
          </section>
        </Container>
      </Hero>
      <Container className="flex flex-col justify-center gap-y-32">
        <ReasonsToEnroll />
      </Container>
      <section className="mb-32 mt-32">
        <Highlights />
      </section>
      <Container className="flex flex-col justify-center gap-y-32">
        <Statistics />
      </Container>
      <Partners />
    </Page>
  );
}
