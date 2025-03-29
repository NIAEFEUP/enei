import ReasonsToEnrollItem from "./reasons_to_enroll_item";
import WineGlass from "../icons/wine_glass";
import Crowd from "../icons/crowd";
import LegoTool from "../icons/lego_tool";
import BookOpen from "../icons/book_open";

export default function ReasonsToEnroll() {
  return (
    <section className="grid grid-cols-1 items-center justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ReasonsToEnrollItem
        icon={<LegoTool />}
        title="01 Inspiração"
        description="Descobre as últimas tendências tecnológicas e encontra motivação para os teus próximos desafios."
      />
      <ReasonsToEnrollItem
        icon={<BookOpen />}
        title="02 Educação"
        description="Palestras e workshops com profissionais e académicos de renome. Sai do evento com novas competências."
      />
      <ReasonsToEnrollItem
        icon={<Crowd />}
        title="03 Chat"
        description="Conhece estudantes com o mesmo gosto que tu e as empresas relevantes da tua area, onde podes seguir a tua carreia"
      />
      <ReasonsToEnrollItem
        icon={<WineGlass />}
        title="04 Festa"
        description="Descontrair e celebrar com festas e atividades inesquecíveis. Afinal, networking também se faz a divertir!"
      />
    </section>
  );
}
