export default function Sponsors() {
    return (
        <div className="w-full flex flex-col items-center gap-y-8">
            <h3 className="text-3xl font-bold text-center text-enei-blue lowercase">Patrocínios</h3>
            <div className="flex flex-row gap-x-8 items-center">
                <img
                    className="w-24"
                    src="/images/company/dominos.png"
                    alt="Dominos logo"
                />

                <img
                    className="w-24"
                    src="/images/company/nicola.png"
                    alt="Uphold logo"
                />

                <img
                    className="w-24"
                    src="/images/company/panike.png"
                    alt="Panike logo"
                />

                <img
                    className="w-24"
                    src="/images/company/redbull.png"
                    alt="Redbull logo"
                />
            </div>
        </div>
    )
}