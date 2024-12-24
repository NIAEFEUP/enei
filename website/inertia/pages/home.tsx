import React, { useLayoutEffect } from "react";
import AppLayout from "../layouts/applayout";

export default function Home() {
  const [countdown, setCountdown] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDateEnv = import.meta.env.VITE_TARGET_DATE;
  const targetDate = new Date(targetDateEnv).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    } else {
      setCountdown({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  //this runs before render
  useLayoutEffect(() => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }, []);

  return (
    <>
      <AppLayout title="Home" className="flex">
        <div className="absolute inset-0 bg-[url('/images/background.jpeg')] bg-cover bg-no-repeat bg-bottom md:bg-center z-2 opacity-40" />
        <div className="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-[#0B4F6C_30%] to-[#EFE4CA_100%] z-0" />

        <section className="grow relative flex flex-col gap-8 px-6 sm:px-12 md:px-24 lg:px-36 py-24 md:py-12 md:justify-evenly z-10">
          <div className="flex-grow md:flex-grow-0">
            <h1 className="w-3/12 text-justify font-space-grotesk text-5xl font-bold tracking-tight text-white leading-[60px] md:leading-[90px] md:text-7xl ">
              <div className="block gap-10 flex-row sm:flex sm:gap-0 md:block md:gap-10 lg:flex lg:gap-0">
                <p className="whitespace-nowrap lowercase text-enei-beige">
                  Encontro&nbsp;
                </p>
                <p className="whitespace-nowrap lowercase text-enei-beige">
                  Nacional de
                </p>
              </div>

              <div className="block gap-10 flex-row sm:flex sm:gap-0 md:block md:gap-10 lg:flex lg:gap-0">
                <p className="whitespace-nowrap lowercase text-enei-beige">
                  Estudantes de&nbsp;
                </p>
                <p className="whitespace-nowrap lowercase text-enei-beige">
                  Informática
                </p>
              </div>
            </h1>
            <p className="font-space-grotesk font-normal text-2xl text-enei-beige mt-2 md:text-4xl">
              Porto 2025 | 11-14 de abril
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 w-fit gap-4 mt-10">
              <div className="bg-enei-beige opacity-75 w-24 md:w-32 text-center">
                <p className="font-space-grotesk text-enei-blue text-3xl md:text-5xl font-bold mt-10">
                  {countdown.days.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </p>
                <p className="text-enei-blue text-base md:text-xl font-bold mt-5 mb-3">
                  DIAS
                </p>
              </div>
              <div className="bg-enei-beige opacity-75 w-24 md:w-32 text-center">
                <p className="font-space-grotesk text-enei-blue text-3xl md:text-5xl font-bold mt-10">
                  {countdown.hours.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </p>
                <p className="text-enei-blue text-base md:text-xl font-bold mt-5 mb-3">
                  HORAS
                </p>
              </div>
              <div className="bg-enei-beige opacity-75 w-24 md:w-32 text-center">
                <p className="font-space-grotesk text-enei-blue text-3xl md:text-5xl font-bold mt-10">
                  {countdown.minutes.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </p>
                <p className="text-enei-blue text-base md:text-xl font-bold mt-5 mb-3">
                  MINUTOS
                </p>
              </div>

              <div className="bg-enei-beige opacity-75 w-24 md:w-32 text-center">
                <p className="font-space-grotesk text-enei-blue text-3xl md:text-5xl font-bold mt-10">
                  {countdown.seconds.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </p>
                <p className="text-enei-blue text-base md:text-xl font-bold mt-5 mb-3">
                  SEGUNDOS
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <p className="mr-2 w-48 bg-enei-beige p-2.5 px-8 text-center font-space-grotesk text-lg font-bold text-enei-blue uppercase">
              Brevemente
            </p>
          </div>
        </section>
      </AppLayout>
    </>
  );
}
