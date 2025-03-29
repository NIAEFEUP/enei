export default function Collaborators() {
  return (
    <section className="flex w-full flex-col items-center gap-y-8">
      <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">Colaboradores</h3>
      <div className="flex flex-row items-center gap-x-8">
        <img className="w-24" src="/images/institution/acm.png" alt="ACM logo" />

        <img className="w-24" src="/images/institution/vou.png" alt="VOU logo" />

        <img className="w-24" src="/images/institution/ieee.png" alt="IEEE logo" />
      </div>
    </section>
  );
}
