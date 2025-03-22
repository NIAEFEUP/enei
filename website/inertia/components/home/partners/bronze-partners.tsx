export default function BronzePartners() {
    return (
        <div className="relative w-full flex flex-col items-center gap-y-8">
            <div className="absolute inset-x-0 bronze-partner-waves bottom-[-12em]"/>
            <div className="flex flex-col gap-y-4 relative">
                <h3 className="text-3xl font-bold text-center text-white">Bronze</h3>
                <div className="grid grid-cols-2 gap-6 justify-center items-center">
                    <img
                        className="w-24"
                        src="/images/company/apgar.png"
                        alt="Apgar logo"
                    />

                    <img
                        className="w-24"
                        src="/images/company/deloitte.png"
                        alt="Deloitte logo"
                    />

                    <img
                        className="w-24"
                        src="/images/company/kaizen.png"
                        alt="Kaizen logo"
                    />
                </div>
            </div>
        </div>
    )
}