export default function InstitutionalPartners() {
    return (
        <div className="w-full flex flex-col items-center gap-y-8">
            <h3 className="text-3xl font-bold text-center text-enei-blue lowercase">Parceiros Institucionais</h3>
            <div className="grid grid-cols-2 gap-y-8 gap-x-32 items-center">
                <img
                    className="w-24"
                    src="/images/institution/feup.png"
                    alt="FEUP logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/isep.png"
                    alt="ISEP logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/dei.png"
                    alt="DEI logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/deiisep.png"
                    alt="DEI ISEP logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/ordemengenheiros.png"
                    alt="Ordem engenheiros logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/scaleup.png"
                    alt="ScaleUp logo"
                />


                <img
                    className="w-24"
                    src="/images/institution/portotechhub.png"
                    alt="Porto Tech Hub logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/cgd.png"
                    alt="CGD logo"
                />
            </div>
        </div>
    )
}