export default function Orgs() {
    return (
        <div className="w-full flex flex-col items-center gap-y-8">
            <h3 className="text-3xl font-bold text-center text-enei-blue lowercase">organizações parceiras</h3>
            <div className="flex flex-row gap-x-8 items-center">
                <img
                    className="w-24"
                    src="/images/institution/aefeup.png"
                    alt="AEFEUP logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/aeisep.png"
                    alt="AEISEP logo"
                />
            </div>
        </div>
    )
}