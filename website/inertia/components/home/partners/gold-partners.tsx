export default function GoldPartners() {
    return (
        <div className="relative w-full flex flex-col items-center gap-y-8 h-[25em]">
            <div className="absolute inset-x-0 gold-partner-waves bottom-1"/>
            <div className="flex flex-col gap-y-4 relative">
                <h3 className="text-4xl font-bold text-center text-white">Gold</h3>
                <div className="flex flex-row gap-x-8 items-center">
                    <img
                        className="w-40"
                        src="/images/company/uphold.png"
                        alt="Uphold logo"
                    />

                    <img
                        className="w-40"
                        src="/images/company/cloudflare.png"
                        alt="Cloudflare logo"
                    />
                </div>
            </div>
        </div>
    )
}