export default function InvitedAssociations() {
    return (
        <section className="flex w-full flex-col items-center gap-y-8">
            <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">Associações convidadas</h3>
            <div className="grid grid-cols-2 items-center gap-x-8 gap-y-8 md:grid-cols-2">
                <img className="w-24" src="/images/institution/ansol.png" alt="Ansol logo" />

                <img className="w-24" src="/images/institution/pt.png" alt="PT logo" />

                <img className="w-24" src="/images/institution/wikemedia.png" alt="Wikimedia logo" />

                <img className="w-24" src="/images/institution/d3.png" alt="D3 logo" />
            </div>
        </section>
    )
}