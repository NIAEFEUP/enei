export default function Orgs() {
  return (
    <section className="flex w-full flex-col items-center gap-y-8">
      <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">
        organizações parceiras
      </h3>
      <div className="flex flex-row items-center gap-x-8">
        <img className="w-24" src="/images/institution/aefeup.png" alt="AEFEUP logo" />

        <img className="w-24" src="/images/institution/aeisep.png" alt="AEISEP logo" />
      </div>
    </section>
  );
}
