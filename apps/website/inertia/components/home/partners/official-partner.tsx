export default function OfficialPartner() {
    return (
        <div className="relative w-full flex flex-col items-center gap-y-8 h-[25em]">
            <div className="absolute inset-x-0 official-partner-waves bottom-[1em] bottom-[-5em]"/>
            <div className="relative mt-20 flex flex-col gap-y-8 bottom-[5em]">
                <h3 className="text-5xl font-bold text-white text-center">Oficial</h3>
                <img
                    className="w-64"
                    src="/images/company/blip.png"
                    alt="Blip logo"
                />
            </div>
        </div>
    )
}