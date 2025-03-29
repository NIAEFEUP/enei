export default function OfficialPartner() {
  return (
    <section className="relative flex h-[25em] w-full flex-col items-center gap-y-8">
      <div className="official-partner-waves absolute inset-x-0 bottom-[-2em]" />
      <div className="relative bottom-[4em] mt-20 flex flex-col gap-y-8">
        <h3 className="text-center text-5xl font-bold text-white">Oficial</h3>
        <img className="w-64" src="/images/company/blip.png" alt="Blip logo" />
      </div>
    </section>
  );
}
