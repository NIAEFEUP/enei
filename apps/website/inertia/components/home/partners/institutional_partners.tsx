export default function InstitutionalPartners() {
  return (
    <div className="flex w-full flex-col items-center gap-y-8">
      <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">
        Parceiros Institucionais
      </h3>
      <div className="grid grid-cols-2 items-center gap-x-32 gap-y-8">
        <img className="w-24" src="/images/institution/feup.png" alt="FEUP logo" />

        <img className="w-24" src="/images/institution/isep.png" alt="ISEP logo" />

        <img className="w-24" src="/images/institution/dei.png" alt="DEI logo" />

        <img className="w-24" src="/images/institution/deiisep.png" alt="DEI ISEP logo" />

        <img
          className="w-24"
          src="/images/institution/ordemengenheiros.png"
          alt="Ordem engenheiros logo"
        />

        <img className="w-24" src="/images/institution/scaleup.png" alt="ScaleUp logo" />

        <img
          className="w-24"
          src="/images/institution/portotechhub.png"
          alt="Porto Tech Hub logo"
        />

        <img className="w-24" src="/images/institution/cgd.png" alt="CGD logo" />
      </div>
    </div>
  );
}
