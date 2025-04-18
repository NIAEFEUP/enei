import { BaseSeeder } from "@adonisjs/lucid/seeders";
import Event from "#models/event";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  async run() {
    /*
     *
     * DIA 12 DE ABRIL - MANHÃ
     *
     */

    await Event.create({
      title: "Um cheirinho de Computação Quântica",
      description:
        "Neste workshop, vamos direto ao ponto: uma introdução leve à teoria e muita prática para tudo fazer sentido. Queremos mostrar que computação quântica não é um bicho de sete cabeças – qualquer um pode começar a explorar este universo incrível!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 10, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - ISEP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Digital Design Thinking",
      description:
        "Neste workshop, vamos explorar o Design Thinking como metodologia criativa para desenvolver produtos digitais. Em equipa, iremos passar por todo o processo, desde a identificação do problema até à criação de um protótipo de baixa fidelidade, aplicando as ferramentas essenciais ao longo do caminho.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 10, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - ISEP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Low-Code Magic: Accelerate Digital Transformation with Power Platform",
      description:
        "Descobre como o Power Automate e o Power Apps podem automatizar tarefas e criar aplicações personalizadas sem necessidade de programação. Neste workshop, vais aprender a desenvolver apps rapidamente com o Power Apps e a simplificar processos com o Power Automate, aumentando a eficiência e poupando tempo. Com exemplos práticos, vais ver como estas ferramentas são usadas no dia a dia das empresas. No final, estarás pronto para criar aplicações simples, automatizar tarefas repetitivas e identificar oportunidades para soluções low-code.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 10, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - ISEP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Qualidade de Software: mais do que apenas testes",
      description:
        "Testar não é só encontrar bugs – é essencial no desenvolvimento de software. Muitas vezes subestimados, os testes garantem qualidade e confiabilidade. Nesta palestra, vamos desmistificar a qualidade de softwarem explorar o ciclo de desenvolvimento (SDLC/STLC) e entender o papel dos testes. Veremos diferentes tipos e como a colaboração entre QA e Dev melhora a eficiência e previne falhas.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 10, minute: 0 }),
      duration: 30,
      type: "talk",
      location: "Auditório - ISEP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "The programmer who didn’t know how to code – Powered by IEEE Portugal",
      description:
        "AI is transforming every field, with an even greater impact on Electrical and Electronics Engineering. Combined with IoT/WoT, cloud computing, and networking, these changes are profound. One major shift is in code development, where AI is not just automating code generation but changing programming itself. This talk explores the future of programming, showcasing tools and platforms shaping this transformation.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 10, minute: 30 }),
      duration: 60,
      type: "talk",
      location: "Auditório - ISEP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Veículos Autónomos – o papel dos sistemas computacionais críticos",
      description:
        "A indústria automóvel evolui com a condução autónoma, sensores avançados e IA, preparando a transição para veículos definidos por software (SDV). O software torna-se central na personalização, atualização remota e controlo dos veículos. Esta palestra aborda os sistemas computacionais, destacando desafios, segurança e arquiteturas, essenciais para garantir fiabilidade e desempenho",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 11, minute: 30 }),
      duration: 30,
      type: "talk",
      location: "Auditório - ISEP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    /*
     *
     * DIA 12 DE ABRIL - INÍCIO DA TARDE
     *
     */

    await Event.create({
      title: "Effortlessly building global-scale applications with Cloudflare",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 14, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "CTF's: the best way into the hacking world",
      description:
        "Gostas de cibersegurança mas não sabes por onde começar? Neste workshop, vais aprender tudo sobre Capture The Flag (CTF), incluindo onde praticar, como melhorar rapidamente e outras formas de treino. Além disso, vais poder resolver os teus primeiros desafios!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 14, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Functional Web Development with Phoenix LiveView",
      description:
        "Phoenix é a framework web mais popular de Elixir, uma linguagem funcional que equilibra simplicidade, concorrência e tolerância a falhas. Neste workshop, vais aprender a criar interfaces interativas e em tempo real sem escrever JavaScript, utilizando o Phoenix LiveView. Explora na prática como desenvolver aplicações escaláveis de forma produtiva, aproveitando todo o potencial deste ecossistema.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 14, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title:
        "O futuro do desenvolvimento de videojogos: IA, Mundos procedimentais e tecnologia de próxima geração ",
      description:
        "A indústria dos videojogos está a evoluir rapidamente, impulsionada por Inteligência Artificial, geração procedural e cloud gaming, que estão a transformar o desenvolvimento de jogos AAA e AA. Nesta palestra, exploramos como as tecnologias de última geração moldam a próxima geração de videojogos e quais as competências e ferramentas essenciais para se destacar no setor.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 14, minute: 0 }),
      duration: 45,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Como fazer software para estúdios de Hollywood",
      description:
        "A Sound Particles cria software de áudio utilizado por grandes estúdios de Hollywood em produções icónicas como Dune, Game of Thrones, Oppenheimer, Super Mario e Star Wars. Nesta palestra, vamos explorar a trajetória da empresa, o impacto do seu produto na indústria e conselhos valiosos para aqueles que desejam sonhar alto.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 14, minute: 45 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "AI, Copilots, and the future of software development",
      description:
        "AI and large language models are transforming software development. Millions of developers use GitHub Copilot, and AI writes over 25% of code at major companies like Google. The next wave of agentic AI developer tools, including Copilot's Project Padawan, is set to further redefine software creation.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 15, minute: 15 }),
      duration: 60,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    /*
     *
     * DIA 12 DE ABRIL - FIM DA TARDE
     */

    await Event.create({
      title: "Flutter – Building an app for mobile, web and desktop using a single Framework!",
      description:
        "Um workshop prático onde podes experimentar o Flutter, esclarecer dúvidas e perceber porque pode ser a solução perfeita para a tua aplicação. Ideal para quem procura uma tecnologia que permite desenvolver apps para várias plataformas de forma eficiente e moderna!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 16, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Decoding the Blockchain: Cryptography and the Power of Proof",
      description:
        "Já te perguntaste “afinal, o que é a blockchain?” ao ver o valor de uma criptomoeda oscilar? Apesar da desinformação, esta tecnologia é fascinante e cheia de potencial. Neste workshop, vamos explorar os seus fundamentos criptográficos e o seu funcionamento. Vem desvendar este universo!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 16, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Mobile development with the expressive power of Kotlin",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 16, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Montar Startups Ultra-ambiciosas – Pros & Contras",
      description:
        "Desafiar o domínio do Excel pode parecer arriscado, mas faz sentido – grandes avanços surgem quando questionamos o padrão. Os melhores investidores e engenheiros buscam desafios assim, pois neles estão as maiores oportunidades. Na palestra, trarei exemplos práticos de como repensar ferramentas pode abrir novas soluçoes e mudar a forma como lidamos com dados.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 16, minute: 30 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Tenho uma ideia. Como começar? Como a vender?",
      description:
        '"Ideas are cheap, execution is everything." Esta frase nunca foi tão relevante como na era da IA. Nesta talk, vamos explorar como transformar uma ideia em realidade e as melhores formas de partilhar esse produto com o mundo.',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 17, minute: 0 }),
      duration: 45,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "CRDTs: Building blocks for high availability and beyond",
      description:
        "Sistemas distribuídos são complexos e sujeitos a falhas. Para garantir disponibilidadem permitem operações locais, mesmo com divergências. CRDTs (Conflict-free Replicated Data Types) resolvem esses conflitos, garantindo a convergência dos dados. Nesta palestra, exploraremos seus conceitos e aplicações, presentes em ferramentas como Google Docs, Apple Notes e Figma.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 17, minute: 45 }),
      duration: 45,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    /*
     *
     * DIA 13 DE ABRIL - MANHÃ
     *
     */

    await Event.create({
      title: "Kubernetes in Action: Mastering Container Orchestration",
      description:
        "Kubernetes é a principal plataforma de orquestração de containers, facilitando a implementação, escalabilidade e gestão de aplicações. Neste workshop, serão abordados conceitos fundamentais, implementação, estratégias de escalabilidade e gestão de configurações. Os participantes irão desenvolver uma base sólida em Kubernetes e compreender o seu papel no desenvolvimento em Cloud.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 10, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - ISEP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Rethinking programming: an introduction to functional programming with Scala",
      description:
        "A programação funcional é uma abordagem baseada em princípios que reduz significativamente a ocorrência de erros ao eliminar efeitos colaterais no código. Neste workshop, vais aprender a aplicar o design funcional puro em Scala, permitindo-te desenvolver software mais fiável e livre de erros para os teus projetos no mundo real.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 10, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - ISEP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Improving microservices communication with gRPC in .NET",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 10, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - ISEP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Unlocking the Power of AI on Chrome",
      description:
        "Junta-te a nós para explorar a IA em dispositivos com o Gemini Nano! Esta palestra apresenta a nova Prompt API do Chrome, que funciona localmente sem enviar dados para servidores. Aprende a criar aplicações inovadoras com IA que oferecem privacidade reforçada, respostas ultrarrápidas e que funcionam offline. Seja qual for o teu nível de experiência, esta palestra é para ti!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 10, minute: 0 }),
      duration: 45,
      type: "talk",
      location: "Auditório - ISEP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Que impacto tem o desenvolvimento de software numa equipa de F1?",
      description:
        "Desde simulações, aerodinâmica e túnel de vento até decisões de estratégia, telemetria, car setup, performance e sistemas de controlo – como pode um engenheiro de software chegar ao mundo da F1 e ter um impacto positivo?",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 10, minute: 45 }),
      duration: 45,
      type: "talk",
      location: "Auditório - ISEP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Equipa de produto: Quem manda aqui? Depende!",
      description:
        "O PM quer definir a visão, o PO organizar o backlog, e os Devs só querem que tudo faça sentido. Mas e quando não há PO, apenas um PM e a equipa de desenvolvimento? Como funciona? E quando algo corre mal, quem assume a responsabilidade? Vamos discutir o papel do PO/PM e os desafios da gestão de equipa.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 11, minute: 30 }),
      duration: 30,
      type: "talk",
      location: "Auditório - ISEP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    /*
     *
     * DIA 13 DE ABRIL - INÍCIO DA TARDE
     *
     */

    await Event.create({
      title: "Drupal CMS: Cria o teu website com ajuda de AI!",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 14, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title:
        "A Hands-on workshop on how to build scalable ETL Pipelines on AWS using S3, Glue, Lambda, and Athena",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 14, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Gerir infraestrutura com Terraform",
      description:
        "Neste workshop, vamos explorar os conceitos fundamentais de Infrastructure as Code (IaC) e aplicá-los na prática com Terraform. Geriremos recursos na Azure, uma conta de identidades no KeyCloak e a configuração de um repositório GitHub.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 14, minute: 0 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Cyberwarfare: Who needs a gun when you have a keyboard? Powered by ACM FEUP",
      description:
        "As governments depend more on technology, Cyberwarfare has become a major threat. Hackers can cripple nations by targeting critial systems like transport and finance – no physical force needed. Once, only nuclear or biological weapons were seen as destructive, but now, a few lines of code can cause chaos. This talk will explore types of cyber warfare, real-world cases, and strategies to combat these threats.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 13, minute: 45 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Abordagens e Desafios da Realidade Virtual e Aumentada na Saúde e Reabilitação",
      description:
        "A Realidade Aumentada (AR) e a Realidade Virtual (VR) estão a transformar a medicina, melhorando a visualização de imagens, o planeamento cirúrgico e a reabilitação. No entanto, a integração destas tecnologias ainda enfrenta desafios, como a adaptação aos fluxos de trabalho tradicionais e a necessidade de uma interação mais intuitiva.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 14, minute: 30 }),
      duration: 45,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "How to look through skin with AI",
      description:
        "This talk will introduce the exciting role of AI in science beyond the media hype around chatbots, image generation, and AI music. We’ll explore how generative AI enables optical correction in microscope images, offering potential for harmless disease diagnosis through skin. I’ll also discuss the challenges of capturing images through skin, managing distortions, and the need for interdisciplinary collaboration to solve these issues. Additionally, I’ll share my experiences producing videos for the Computerphile YouTube channel, which has grown into a global platform. I’ll discuss the channel’s backstory, the filming process, and my future aspirations. Ultimately, I hope to inspire you to share the wonders of computer science with the world!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 15, minute: 15 }),
      duration: 60,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    /*
     *
     * DIA 13 DE ABRIL - FIM DA TARDE
     *
     */

    await Event.create({
      title: "Deep Learning for Human Pose Estimation: From Theory to Application",
      description:
        "Este workshop aborda os fundamentos da estimativa de pose humana, uma tecnologia essencial em saúde, desporto, animação e interação humano-computador. Através de exercícios práticos e exemplos reais, vais aprender a detetar e analisar o movimento humano com aprendizagem profunda — não é necessária experiência prévia, apenas curiosidade!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 16, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Cracking the Coding Interview: sobreviver à entrada no mercado como junior",
      description:
        "Desde a procura de vagas até à proposta final, o processo de recrutamento envolve vários desafios — screening de currículos, coding tests, entrevistas comportamentais e técnicas — exigindo uma preparação sólida em cada etapa. Este workshop será uma partilha de experiências de quem entrou recentemente no mercado de trabalho, oferecendo dicas valiosas para te destacares em cada fase do processo.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 16, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Agile in a Nutshell: A Mini Sprint Simulation",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 16, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Enterprise Integration: Uma competência para a era dos Dados e IA",
      description:
        "Os dados são o novo petróleo e a IA está a transformar os setores, impulsionada pela Enterprise Integration. Nesta palestra, vais explorar como as tecnologias da Microsoft – BizTalk Server, Azure Integration Services, Power Platform e Azure Logic Apps – conectam aplicações, automatizam processos e alimentam a IA em tempo real.  Queres ser apenas mais um peixe num tanque de tubarões… ou o tubarão que lidera a próxima geração de integração e inteligência?",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 16, minute: 30 }),
      duration: 45,
      type: "talk",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "A story on Computer Vision: from zero to hero",
      description:
        "Nesta palestra, vou partilhar o meu percurso desde a investigação em Computer Vision no doutoramento até à transição para a indústria, abordando os desafios da integração laboral, a aplicação de Computer Vision em contextos empresariais e a continuidade da investigação neste setor.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 17, minute: 15 }),
      duration: 45,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Competitive Programming: Will it make you a better programmer?",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 13, hour: 18, minute: 0 }),
      duration: 45,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    /*
     *
     * DIA 14 DE ABRIL - MANHÃ
     *
     */

    await Event.create({
      title: "Kotlin Kickstart: Mastering the Basics for Modern Development",
      description:
        "Descobre o Kotlin, a linguagem moderna e eficiente que está a transformar o desenvolvimento de software. Neste workshop, vais aprender os conceitos essenciais, desde a sintaxe até à programação orientada a objetos, através de exercícios práticos. No final, estarás pronto para escrever os teus primeiros programas e explorar novas oportunidades em backend e projetos multiplataforma!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 9, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "React Basics & The Importance of Testing",
      description:
        "O React é uma biblioteca JavaScript que transformou o desenvolvimento de interfaces dinâmicas e interativas. Neste workshop, vais explorar os conceitos essenciais desta tecnologia, bem como a importância de integrar testes para garantir a qualidade do código. Tudo isso será demonstrado através da construção de uma simples aplicação, onde vais aprender na prática como combinar React com boas práticas de teste.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 9, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "Workshop de Golang",
      description:
        "Go é uma linguagem moderna, simples e eficiente. Mas o que a torna tão poderosa? - Powered by AlumniEI",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 9, minute: 30 }),
      duration: 120,
      type: "workshop",
      location: "TBD - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 20,
      ticketsTotal: 20,
      price: 0,
    });

    await Event.create({
      title: "AI4Cyber",
      description:
        "Com a crescente digitalização e a sofisticação dos ataques, a Inteligência Artificial surge como solução disruptiva para a cibersegurança. No entanto, é essencial considerar também as vulnerabilidades e novos vetores de ataque que a IA introduz. Esta palestra aborda ambas as perspetivas: o uso da IA na cibersegurança e a segurança da própria IA.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 9, minute: 30 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Talk TBD",
      description: "",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 10, minute: 0 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Manage your Infrastructure using code",
      description:
        "No desenvolvimento de software, gerir a infraestrutura é tão importante quanto escrever código. Esta apresentação explica como definir, implementar e gerir infraestrutura na Cloud com Infrastructure as Code (IaC). Inclui uma introdução à Cloud Computing na AWS e ao OpenTofu, uma alternativa open-source ao Terraform, que facilita a gestão da infraestrutura como código. Serão também abordadas outras tecnologias populares na indústria.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 10, minute: 30 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Mecanismos e criptografia da identidade digital",
      description:
        "Como garantimos a nossa identidade nas aplicações do dia a dia? E como sabemos que aquilo com que interagimos é realmente o que aparenta ser? Nesta apresentação, serão explorados exemplos reais de como os desafios de identidade digital são resolvidos em diferentes contextos informáticos.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 11, minute: 0 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    /*
     *
     * DIA 14 DE ABRIL - INÍCIO DA TARDE
     *
     */

    await Event.create({
      title: "Autonomous Driving: foundations, challenges and the road ahead",
      description:
        "A condução autónoma está a transformar a mobilidade, mas o que é preciso para chegar à automação total? Nesta palestra, vamos explorar os quatro pilares da condução autónoma, comparar abordagens com e sem mapas e analisar os níveis de automação da SAE. Descobre como estes fatores moldam o futuro dos veículos autónomos e os desafios que ainda faltam superar!",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 12, minute: 0 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });

    await Event.create({
      title: "Torneio de Bots de Sueca",
      description:
        '"Então, com o trunfo não cortas o Ás!?" – estas palavras revelam a confiança de quem conhece bem o jogo, mas será mesmo esta a melhor forma de jogar?\n\nO Torneio de Bots de Sueca é uma competição em que cada equipa, composta por 1 a 3 jogadores, tem de desenvolver dois bots capazes de jogar o tradicional jogo de cartas português, a Sueca. Os bots podem ser idênticos ou diferentes, conforme o critério de cada equipa. Demonstra, através da vossa linguagem de programação favorita, como é que se joga!',
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 11, minute: 30 }),
      duration: 60,
      type: "competition",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: true,
      ticketsRemaining: 1000,
      ticketsTotal: 1000,
      price: 0,
    });

    await Event.create({
      title: "eduTAP – A Sneak Peek into the Future of Campus Cards",
      description:
        "Universities still use **plastic campus cards**, but **digital lifestyles** demand an upgrade. **eduTAP** replaces them with **secure digital wallet passes**, enabling **seamless, private, and interoperable access** to **Higher Education services**. This talk covers **eduTAP’s architecture, real-world use, and role in cross-border mobility** via **eduGAIN standards**. More than a **tech upgrade**, **eduTAP redefines student IDs** for a **smarter, connected campus**.",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 14, hour: 11, minute: 30 }),
      duration: 30,
      type: "talk",
      location: "Auditório - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
      price: 0,
    });
  }
}
