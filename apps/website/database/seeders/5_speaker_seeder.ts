import SpeakerProfile from "#models/speaker_profile";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
  async run() {
    /*
     *
     * DIA 12 DE ABRIL - MANHÃ
     *
     */

    await SpeakerProfile.create({
      firstName: "Fernando",
      lastName: "Maia",
      jobTitle: "Engenheiro Óptico",
      profilePicture: "/images/speakers/fernando-maia.jpg",
      company: "iLoF",
    });

    await SpeakerProfile.create({
      firstName: "Dina",
      lastName: "Oliveira",
      jobTitle: "Fundadora",
      profilePicture: "/images/speakers/dina-oliveira.jpg",
      company: "Limanade – Innovation & Marketing",
    });

    await SpeakerProfile.create({
      firstName: "Mariana",
      lastName: "Oliveira",
      jobTitle: "Power Platform Engineer",
      profilePicture: "/images/speakers/mariana-oliveira.jpg",
      company: "7.1 Tech Hub",
    });

    await SpeakerProfile.create({
      firstName: "Patrícia",
      lastName: "Duarte Mateus",
      jobTitle: "Criadora do A QA Portuguesa",
      profilePicture: "/images/speakers/patricia-duarte-mateus.jpg",
      company: "A QA Portuguesa",
    });

    await SpeakerProfile.create({
      firstName: "Charalampos",
      lastName: "Patrikakis",
      jobTitle: "IEEE Distinguished Contributor",
      profilePicture: "/images/speakers/charalampos-patrikakis.jpg",
      company: "IEEE",
    });

    await SpeakerProfile.create({
      firstName: "Luís",
      lastName: "Miguel Pinho",
      jobTitle: "Senior Researcher & Professor",
      profilePicture: "/images/speakers/luis-pinho.jpg",
      company: "INESC TEC & ISEP",
    });

    /*
     *
     * DIA 12 DE ABRIL - INÍCIO DA TARDE
     *
     */

    await SpeakerProfile.create({
      firstName: "Luís",
      lastName: "Duarte",
    });

    await SpeakerProfile.create({
      firstName: "Francisco",
      lastName: "Brito",
      jobTitle: "Membro",
      profilePicture: "/images/speakers/francisco-brito.jpg",
      company: "wUMrm (Equipa de CTFs)",
    });

    await SpeakerProfile.create({
      firstName: "Álvaro",
      lastName: "Oliveira",
      jobTitle: "Membro",
      profilePicture: "/images/speakers/alvaro-oliveira.jpg",
      company: "wUMrm (Equipa de CTFs)",
    });

    await SpeakerProfile.create({
      firstName: "Afonso",
      lastName: "Santos",
      jobTitle: "Membro",
      profilePicture: "/images/speakers/afonso-santos.jpg",
      company: "wUMrm (Equipa de CTFs)",
    });

    await SpeakerProfile.create({
      firstName: "Pedro",
      lastName: "Sousa",
      jobTitle: "Membro",
      profilePicture: "/images/speakers/pedro-sousa.jpg",
      company: "wUMrm (Equipa de CTFs)",
    });

    await SpeakerProfile.create({
      firstName: "Nélson",
      lastName: "Estevão",
      jobTitle: "Engenheiro de Software",
      profilePicture: "/images/speakers/nelson-estevao.jpg",
      company: "Marmela",
    });

    await SpeakerProfile.create({
      firstName: "Paulo",
      lastName: "Gomes",
      jobTitle: "Fundador & CEO",
      profilePicture: "/images/speakers/paulo-gomes.jpg",
      company: "Paulo Games Productions",
    });

    await SpeakerProfile.create({
      firstName: "Nuno",
      lastName: "Fonseca",
      jobTitle: "Fundador & CEO",
      profilePicture: "/images/speakers/nuno-fonseca.jpg",
      company: "Sound Particles",
    });

    await SpeakerProfile.create({
      firstName: "Eddie",
      lastName: "Aftandilian",
      jobTitle: "Principal Researcher",
      profilePicture: "/images/speakers/eddie-aftandilian.jpg",
      company: "GitHub",
    });

    /*
     *
     * DIA 12 DE ABRIL - FIM DA TARDE
     *
     */

    await SpeakerProfile.create({
      firstName: "Marco",
      lastName: "Ferreira",
      jobTitle: "Fundador",
      profilePicture: "/images/speakers/marco-ferreira.jpg",
      company: "Xarlie",
    });

    await SpeakerProfile.create({
      firstName: "Leonardo",
      lastName: "Moura",
      jobTitle: "Investigador de Criptografia",
      company: "Capgemini Engineering",
    });

    await SpeakerProfile.create({
      firstName: "Bartek",
      lastName: "Pacia",
      jobTitle: "Software Engineer",
      company: "JetBrains",
    });

    await SpeakerProfile.create({
      firstName: "Humberto",
      lastName: "Ayres Pereira",
      jobTitle: "Cofundador & CEO",
      profilePicture: "/images/speakers/humberto-ayres-pereira.jpg",
      company: "Rows",
    });

    await SpeakerProfile.create({
      firstName: "André",
      lastName: "Oliveira",
      jobTitle: "Fundador & CEO",
      profilePicture: "/images/speakers/andre-oliveira.jpg",
      company: "Pixelmatters",
    });

    await SpeakerProfile.create({
      firstName: "Carlos",
      lastName: "Baquero",
      jobTitle: "Professor",
      profilePicture: "/images/speakers/carlos-baquero.jpg",
      company: "FEUP",
    });

    await SpeakerProfile.create({
      firstName: "Nuno",
      lastName: "Preguiça",
      jobTitle: "Professor",
      profilePicture: "/images/speakers/nuno-preguiça.jpg",
      company: "U. Nova de Lisboa",
    });

    /*
     *
     * DIA 13 DE ABRIL - MANHÃ
     *
     */

    await SpeakerProfile.create({
      firstName: "Leandro",
      lastName: "Sousa",
      jobTitle: "Engenheiro Informático",
      profilePicture: "/images/speakers/leandro-sousa.jpg",
      company: "Noesis",
    });

    await SpeakerProfile.create({
      firstName: "Bruno",
      lastName: "Mendes",
      jobTitle: "Engenheiro de Software",
      profilePicture: "/images/speakers/bruno-mendes.jpg",
      company: "Kevel",
    });

    await SpeakerProfile.create({
      firstName: "Diogo",
      lastName: "Correia",
      jobTitle: ".NET Developer",
      profilePicture: "",
      company: "Devexperts",
    });

    await SpeakerProfile.create({
      firstName: "Francisco",
      lastName: "Loureiro",
      jobTitle: "Team Lead",
      profilePicture: "",
      company: "Devexperts",
    });

    await SpeakerProfile.create({
      firstName: "Fellyph",
      lastName: "Cintra",
    });

    await SpeakerProfile.create({
      firstName: "João",
      lastName: "Romão",
      jobTitle: "Engenheiro Informático",
      profilePicture: "/images/speakers/joao-romao.jpg",
      company: "Aston Martin Aramco F1 Team",
    });

    await SpeakerProfile.create({
      firstName: "Carolina",
      lastName: "Trigo",
      jobTitle: "Senior Product Manager",
      profilePicture: "/images/speakers/carolina-trigo.jpg",
      company: "Native Teams",
    });

    /*
     *
     * DIA 13 DE ABRIL - INÍCIO DA TARDE
     *
     */

    await SpeakerProfile.create({
      firstName: "António",
      lastName: "Aragão",
    });

    await SpeakerProfile.create({
      firstName: "Filipe",
      lastName: "Pereira",
    });

    await SpeakerProfile.create({
      firstName: "Joana",
      lastName: "Pereira",
    });

    await SpeakerProfile.create({
      firstName: "Nuno",
      lastName: "Miranda",
      jobTitle: "Data Engineer",
    });

    await SpeakerProfile.create({
      firstName: "Jorge",
      lastName: "C. Leitão",
      profilePicture: "/images/speakers/jorge-cardoso.jpg",
    });

    await SpeakerProfile.create({
      firstName: "Haider",
      lastName: "Abbas",
      jobTitle: "ACM Distinguished Speaker",
      profilePicture: "/images/speakers/haider-abbas.jpg",
      company: "ACM",
    });

    await SpeakerProfile.create({
      firstName: "Joaquim",
      lastName: "Jorge",
      jobTitle: "Professor Catedrático",
      profilePicture: "/images/speakers/joaquim-jorge.jpg",
      company: "Instituto Superior Técnico",
    });

    await SpeakerProfile.create({
      firstName: "Michael",
      lastName: "Pound",
    });

    /*
     *
     * DIA 13 DE ABRIL - FIM DA TARDE
     *
     */

    await SpeakerProfile.create({
      firstName: "Rojan",
      lastName: "Aslani",
      jobTitle: "Data Scientist",
      profilePicture: "/images/speakers/rojan-aslani.jpg",
      company: "MC Sonae",
    });

    await SpeakerProfile.create({
      firstName: "Sílvia",
      lastName: "Tavares",
      jobTitle: "Data Engineer",
      profilePicture: "/images/speakers/silvia-tavares.jpg",
      company: "Permira",
    });

    await SpeakerProfile.create({
      firstName: "Margarida",
      lastName: "Raposo",
      jobTitle: "Associate Software Engineer ",
      profilePicture: "/images/speakers/margarida-raposo.jpg",
      company: "Feedzai",
    });

    await SpeakerProfile.create({
      firstName: "Rui",
      lastName: "Nascimento",
    });

    await SpeakerProfile.create({
      firstName: "Sandro",
      lastName: "Pereira",
      profilePicture: "/images/speakers/sandro-pereira.jpg",
    });

    await SpeakerProfile.create({
      firstName: "José",
      lastName: "Costa Pereira",
      jobTitle: "Professor",
      profilePicture: "/images/speakers/jose-costa-pereira.jpg",
      company: "FEUP",
    });

    await SpeakerProfile.create({
      firstName: "André",
      lastName: "Restivo",
    });

    /*
     *
     * DIA 14 DE ABRIL - MANHÃ
     *
     */

    await SpeakerProfile.create({
      firstName: "Mafalda",
      lastName: "Landeiro",
      jobTitle: "Senior Backend Developer",
      profilePicture: "/images/speakers/mafalda-landeiro.jpg",
      company: "Blip.pt",
    });

    await SpeakerProfile.create({
      firstName: "Hugo",
      lastName: "Queirós",
    });

    await SpeakerProfile.create({
      firstName: "André",
      lastName: "Moreira",
    });

    await SpeakerProfile.create({
      firstName: "Isabel",
      lastName: "Praça",
      jobTitle: "Professora Coordenadora",
      profilePicture: "/images/speakers/isabel-praca.jpg",
      company: "ISEP",
    });

    await SpeakerProfile.create({
      firstName: "Speaker TBD",
      lastName: "Manhã, dia 14",
    });

    await SpeakerProfile.create({
      firstName: "Rui",
      lastName: "Alves",
      jobTitle: "Site Reliability Engineer",
      profilePicture: "/images/speakers/rui-alves.jpg",
      company: "Kevel",
    });

    await SpeakerProfile.create({
      firstName: "Manuel",
      lastName: "Luís Correia",
      jobTitle: "DevOps Engineer",
      profilePicture: "/images/speakers/manuel-luis-correia.jpg",
      company: "Critical Techworks",
    });

    /*
     *
     * DIA 14 DE ABRIL - INÍCIO DA TARDE
     *
     */

    await SpeakerProfile.create({
      firstName: "Tiago",
      lastName: "Rodrigues",
      jobTitle: "Product Owner",
      profilePicture: "/images/speakers/tiago-rodrigues.jpg",
      company: "Critical Techworks",
    });
  }
}
