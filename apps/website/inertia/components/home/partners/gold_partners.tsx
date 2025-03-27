export default function GoldPartners() {
  return (
    <div className="relative flex h-[25em] w-full flex-col items-center gap-y-8">
      <div className="gold-partner-waves md-bottom-[2em] absolute inset-x-0 bottom-0" />
      <div className="relative mx-8 flex flex-col gap-y-6">
        <h3 className="text-center text-4xl font-bold text-white">Gold</h3>
        <div className="grid grid-cols-2 items-center gap-x-32 gap-y-8">
          <img className="w-40" src="/images/company/uphold.png" alt="Uphold logo" />

          <img className="w-40" src="/images/company/cloudflare.png" alt="Cloudflare logo" />
        </div>
      </div>
    </div>
  );
}
