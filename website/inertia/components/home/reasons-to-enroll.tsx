import ReasonsToEnrollItem from "./reasons-to-enroll-item";
import WineGlass from "../icons/wine-glass";
import Crowd from "../icons/crowd";
import LegoTool from "../icons/lego-tool";
import BookOpen from "../icons/book-open";

export default function ReasonsToEnroll() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
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
        </div>
    )
}