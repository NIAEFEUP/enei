import { Head } from "@inertiajs/react";
import React, { useLayoutEffect } from 'react';
import i18n from 'i18next'

import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t, ready } = useTranslation('', { useSuspense: false });

  const [countdown, setCountdown] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0, });

  const targetDateEnv = import.meta.env.VITE_TARGET_DATE;
  const targetDate = new Date(targetDateEnv).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
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

  }, [])



  return (
    <>
      <Head title="Hello World!" />

      <div className="absolute inset-0 bg-[url('/images/background.jpeg')] bg-cover bg-no-repeat bg-bottom md:bg-center z-2"></div>
      <div className="absolute inset-0 mix-blend-plus-darker bg-gradient-to-b from-[#0B4F6C_8%] to-[#EFE4CA_100%] opacity-[92%] z-0"></div>

      <section
        className="grow relative flex flex-col gap-8 px-5 py-36 md:justify-evenly md:py-0 md:px-0 z-10"
      >
        <div className="mx-auto md:ml-36 flex-grow md:flex-grow-0">
          <h1
            className="w-3/12 text-justify font-space-grotesk text-5xl font-bold tracking-tight text-white md:text-7xl"
          >
            <p className="whitespace-nowrap lowercase">Encontro</p>
            <p className="whitespace-nowrap lowercase">Nacional de</p>
            <p className="whitespace-nowrap lowercase">Estudantes de</p>
            <p className="whitespace-nowrap lowercase">Informática</p>
          </h1>
          <p
            className="font-space-grotesk text-2xl text-white md:text-4xl uppercase"
          >
            Porto 2025
          </p>
          <div className=" flex space-x-4 mt-10 ">
            <div className="flex flex-col items-center bg-enei-beige opacity-75 p-8 w-32">
              <p className="text-enei-blue text-5xl font-bold ">{countdown.days}</p>
              <p className="text-enei-blue text-xl font-bold mt-3">DIAS</p>
            </div>
            <div className="flex flex-col items-center bg-enei-beige opacity-75 p-8 w-32">
              <p className="text-enei-blue text-5xl font-bold">{countdown.hours}</p>
              <p className="text-enei-blue text-xl font-bold mt-3">HORAS</p>
            </div>
            <div className="flex flex-col items-center bg-enei-beige opacity-75 p-8 w-32">
              <p className="text-enei-blue text-5xl font-bold">{countdown.minutes}</p>
              <p className="text-enei-blue text-xl font-bold mt-3">MINUTOS</p>
            </div>
            <div className="flex flex-col items-center bg-enei-beige opacity-75 p-8 w-32">
              <p className="text-enei-blue text-5xl font-bold">{countdown.seconds}</p>
              <p className="text-enei-blue text-xl font-bold mt-3">SEGUNDOS</p>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <p
            className="mr-2 w-48 bg-enei-beige p-2.5 px-8 text-center font-space-grotesk text-lg font-bold text-enei-blue uppercase"
          >
            {t("pages.maintenance.soon")}
          </p>
        </div>
      </section>
    </>
  );
}
