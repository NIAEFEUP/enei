export default function Sponsors() {
  return (
    <div className="flex w-full flex-col items-center gap-y-8">
      <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">Patrocínios</h3>
      <div className="flex flex-row items-center gap-x-8">
        <img className="w-24" src="/images/company/dominos.png" alt="Dominos logo" />

        <img className="w-24" src="/images/company/nicola.png" alt="Uphold logo" />

        <img className="w-24" src="/images/company/panike.png" alt="Panike logo" />

        <img className="w-24" src="/images/company/redbull.png" alt="Redbull logo" />

        <img className="w-24" src="/images/company/mauser.png" alt="Mauser logo" />
      </div>
    </div>
  );
}
