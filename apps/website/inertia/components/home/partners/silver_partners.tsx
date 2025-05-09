export default function SilverPartners() {
  return (
    <section className="relative flex h-[25em] w-full flex-col items-center gap-y-8">
      <div className="silver-partner-waves absolute inset-x-0 bottom-[-4em]" />
      <div className="relative bottom-[2em] flex flex-col gap-y-4">
        <h3 className="text-center text-4xl font-bold text-white">Silver</h3>
        <div className="mx-8 grid grid-cols-3 items-center justify-center gap-x-16">
          <img className="w-32" src="/images/company/sonae.png" alt="Sonae logo" />

          <img className="w-32" src="/images/company/glintt.png" alt="Glintt logo" />

          <img className="w-32" src="/images/company/accenture.png" alt="Accenture logo" />

          <img className="w-32" src="/images/company/nitrosoftware.png" alt="NitroSoftware logo" />

          <img className="w-32" src="/images/company/olisipo.png" alt="Olisipo logo" />
        </div>
      </div>
    </section>
  );
}
