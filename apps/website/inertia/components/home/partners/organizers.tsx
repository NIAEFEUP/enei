export default function Organizers() {
    return (
        <div className="w-full flex flex-col items-center gap-y-8">
            <h3 className="text-3xl font-bold text-center text-enei-blue lowercase">Organizadores</h3>
            <div className="flex flex-row gap-x-8 items-center">
                <img
                    className="w-24"
                    src="/images/institution/ni.png"
                    alt="NIAEFEUP logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/neiisep.png"
                    alt="NEIISEP logo"
                />
            
                <img
                    className="w-24"
                    src="/images/institution/ncgm.png"
                    alt="NCGM logo"
                />
            </div>
        </div>
    )
}