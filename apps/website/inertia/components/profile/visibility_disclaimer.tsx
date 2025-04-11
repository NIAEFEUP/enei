import { Eye, EyeOff } from "lucide-react";

export const IsVisibleDisclaimer = () => {
  return (
    <div className="text-enei-blue my-2 grid grid-cols-[auto_1fr] items-center gap-2">
      <Eye />
      <p>
        <span className="font-bold"> Visível: </span> As informações nesta secção estão visíveis no
        teu perfil.
      </p>
    </div>
  );
};

export const IsNotVisibleDisclaimer = () => {
  return (
    <div className="my-2 grid grid-cols-[auto_1fr] items-center gap-2">
      <EyeOff />
      <p>
        <span className="font-bold"> Invisível: </span> As informações a baixo não estão visíveis no
        teu perfil.
      </p>
    </div>
  );
};
