export default function GoldPartners() {
  return (
    <div className="relative flex h-[25em] w-full flex-col items-center gap-y-8">
      <div className="gold-partner-waves absolute inset-x-0 bottom-[2em]" />
      <div className="relative flex flex-col gap-y-4">
        <h3 className="text-center text-4xl font-bold text-white">Gold</h3>
        <div className="flex flex-row items-center gap-x-8">
          <img className="w-40" src="/images/company/uphold.png" alt="Uphold logo" />

          <img className="w-40" src="/images/company/cloudflare.png" alt="Cloudflare logo" />
        </div>
      </div>
    </div>
  );
}
