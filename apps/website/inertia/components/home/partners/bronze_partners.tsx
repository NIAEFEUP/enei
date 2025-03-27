export default function BronzePartners() {
  return (
    <div className="relative flex w-full flex-col items-center gap-y-8">
      <div className="bronze-partner-waves absolute inset-x-0 bottom-[-6em]" />
      <div className="relative flex flex-col gap-y-4">
        <h3 className="text-center text-3xl font-bold text-white">Bronze</h3>
        <div className="mx-8 grid grid-cols-2 items-center justify-center gap-x-16 gap-y-2 md:grid-cols-3">
          <img className="w-24" src="/images/company/pixelmatters.png" alt="PixelMatters logo" />

          <img className="w-24" src="/images/company/deloitte.png" alt="Deloitte logo" />

          <img className="w-24" src="/images/company/kaizen.png" alt="Kaizen logo" />

          <img className="w-24" src="/images/company/apgar.png" alt="Apgar logo" />

          <img className="w-24" src="/images/company/msglife.png" alt="MsgLife logo" />

          <img className="w-24" src="/images/company/ubiwhere.png" alt="Ubiwhere logo" />
        </div>
      </div>
    </div>
  );
}
