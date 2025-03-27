export default function SilverPartners() {
    return (
        <div className="relative w-full flex flex-col items-center gap-y-8 h-[25em]">
            <div className="absolute inset-x-0 silver-partner-waves bottom-[-1em]"/>
            <div className="flex flex-col gap-y-4 relative">
                <h3 className="text-4xl font-bold text-center text-white">Silver</h3>
                <div className="grid grid-cols-2 gap-6 justify-center items-center">
                    <img
                        className="w-32"
                        src="/images/company/sonae.png"
                        alt="Sonae logo"
                    />

                    <img
                        className="w-32"
                        src="/images/company/olisipo.png"
                        alt="Olisipo logo"
                    />

                    <img
                        className="w-32"
                        src="/images/company/accenture.png"
                        alt="Accenture logo"
                    />

                    <img
                        className="w-32"
                        src="/images/company/glintt.png"
                        alt="Glintt logo"
                    />
                </div>
            </div>
        </div>
    )
}