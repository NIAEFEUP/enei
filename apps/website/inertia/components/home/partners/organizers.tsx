export default function Organizers() {
  return (
    <section className="flex w-full flex-col items-center gap-y-8">
      <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">Organizadores</h3>
      <div className="flex flex-row items-center gap-x-8">
        <img className="w-24" src="/images/institution/ni.png" alt="NIAEFEUP logo" />

        <img className="w-24" src="/images/institution/neiisep.png" alt="NEIISEP logo" />

        <img className="w-24" src="/images/institution/ncgm.png" alt="NCGM logo" />
      </div>
    </section>
  );
}
