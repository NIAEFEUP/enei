import { Link } from "@tuyau/inertia/react";
import HighlightCard from "./highlight_card";

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

export enum EventType {
  Workshop = "Workshop",
  Talk = "Palestra",
}

export default function Highlights() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">Destaques</h3>
        <Link
          className="mr-0 block text-center text-xl font-bold lowercase text-[#5A8C86] underline md:mr-16 md:text-right"
          route="pages:events"
        >
          Ver programa
        </Link>
        <ScrollArea className="w-full">
          <div className="flex w-max flex-row space-x-4 p-4">
            <HighlightCard
              title="How to look through skin with AI"
              person="Michael Pound"
              schedule="13 Abril - Auditório FEUP - 15:15"
              type={EventType.Talk}
              image="michael-pound.jpg"
            />
            <HighlightCard
              title="AI, Copilots, and the future of software development"
              person="Eddie Aftandilian"
              schedule="12 Abril - Auditório ISEP - 15:15"
              type={EventType.Talk}
              image="eddie-aftandilian.jpg"
            />
            <HighlightCard
              title="CRDTs: Building blocks for high availability and beyond"
              person="Carlos Baquero, Nuno Preguiça"
              schedule="13 Abril - Auditório FEUP - 15:15"
              type={EventType.Talk}
              image="baqueropreguica.jpg"
            />
            <HighlightCard
              title="Como fazer software para estúdios de Holywood"
              person="Nuno Fonseca"
              schedule="12 Abril - Auditório FEUP - 14:45"
              type={EventType.Talk}
              image="nuno-fonseca.jpg"
            />
            <HighlightCard
              title="The programmer who didn’t know how to code"
              person="Charalampos Patrikakis"
              schedule="12 Abril - Auditório ISEP - 10:30"
              type={EventType.Talk}
              image="charalampos-patrikakis.jpg"
            />
            <HighlightCard
              title="Cyberwarfare: Who Needs a Gun when you have a Keyboard?"
              person="Haider Abbas"
              schedule="13 Abril - Auditório FEUP - 14:00"
              type={EventType.Talk}
              image="haider-abbas.jpg"
            />
            <HighlightCard
              title="Abordagens e Desafios da Realidade Virtual e Aumentada na Saúde e Reabilitação"
              person="Joaquim Jorge"
              schedule="13 Abril - Auditório FEUP - 14:30"
              type={EventType.Talk}
              image="joaquim-jorge.jpg"
            />
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </div>
  );
}
