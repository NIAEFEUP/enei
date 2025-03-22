export default function Collaborators() {
    return (
        <div className="w-full flex flex-col items-center gap-y-8">
            <h3 className="text-3xl font-bold text-center text-enei-blue lowercase">Colaboradores</h3>
            <div className="flex flex-row gap-x-8 items-center">
                <img
                    className="w-24"
                    src="/images/institution/acm.png"
                    alt="ACM logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/vou.png"
                    alt="VOU logo"
                />

                <img
                    className="w-24"
                    src="/images/institution/ieee.png"
                    alt="IEEE logo"
                />
            </div>
        </div>
    )
}