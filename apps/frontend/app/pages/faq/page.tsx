import { useState } from "react";
import { ChevronDown, ChevronUp } from "@enei/shadcn/icons";
import Page from "#components/common/page";

export default function Faq() {
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleQuestion = (topicIndex: number, questionIndex: number) => {
    const key = `${topicIndex}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const questions = [
    //dummy info
    {
      topic: "Geral",
      questions: [
        {
          question: "O que é a ENEI?",
          answer: "A ENEI é o maior evento de Engenharia Informática em Portugal.",
        },
        {
          question: "Quando é a ENEI?",
          answer: "A ENEI acontece de 1 a 4 de maio.",
        },
      ],
    },
    {
      topic: "Bilhetes & Pagamentos",
      questions: [
        {
          question: "Quais são os métodos de pagamento aceitos?",
          answer: "Aceitamos pagamentos via MB Way, PayPal e Cartão de Crédito.",
        },
        {
          question: "Posso pedir um reembolso?",
          answer: "Os reembolsos estão disponíveis até 15 dias antes do evento.",
        },
      ],
    },
    {
      topic: "Registo no Evento",
      questions: [
        {
          question: "Como faço o registo?",
          answer: "O registo pode ser feito no nosso site oficial através da página de inscrições.",
        },
        {
          question: "O que preciso levar no dia do evento?",
          answer: "Leve o seu bilhete digital e um documento de identificação.",
        },
      ],
    },
    {
      topic: "Sistema de Referências",
      questions: [
        {
          question: "Como funciona o sistema de referências?",
          answer: "Ao indicar amigos, você recebe descontos no bilhete.",
        },
        {
          question: "Quantos amigos posso referenciar?",
          answer: "Não há limite de referências, quanto mais indicar, melhor!",
        },
      ],
    },
    {
      topic: "Networking & Empresas",
      questions: [
        {
          question: "Haverá oportunidades de networking?",
          answer: "Sim! Teremos várias sessões de networking e interação com empresas.",
        },
        {
          question: "Posso agendar reuniões com empresas?",
          answer: "Sim, algumas empresas oferecem slots para reuniões individuais.",
        },
      ],
    },
    {
      topic: "Suporte Técnico",
      questions: [
        {
          question: "Estou com problemas no site, o que fazer?",
          answer: "Entre em contato pelo email suporte@eneiconf.pt.",
        },
        {
          question: "Há suporte durante o evento?",
          answer: "Sim! Teremos uma equipa de suporte disponível presencialmente e online.",
        },
      ],
    },
  ];

  return (
    <Page title="FAQ" className="bg-enei-blue">
      <div className="bg-enei-beige text-enei-blue w-full">
        <header className="flex flex-col items-center justify-center gap-2 p-8">
          <h1 className="text-center text-3xl font-bold lg:text-5xl">Frequently Asked Questions</h1>
          <h2 className="text-center text-lg lg:text-xl">Não encontras uma resposta?</h2>
          <h2 className="text-center text-lg lg:text-xl">
            Contacta-nos 999112222 ou por email geral@eneiconf.pt
          </h2>
        </header>
        <div className="qa-container flex w-full flex-col px-8 lg:px-16">
          {questions.map((topic, topicIndex) => (
            <div key={topicIndex} className="qa-topic mb-8">
              <div className="flex items-center">
                <h3 className="whitespace-nowrap text-xl font-bold text-orange-400 lg:text-3xl">
                  {topic.topic}
                </h3>
                <div className="ml-4 h-0.5 w-full bg-orange-400"></div>
              </div>

              <div className="qa-questions mt-4 flex flex-col gap-4">
                {topic.questions.map((question, questionIndex) => {
                  const isOpen = openQuestions[`${topicIndex}-${questionIndex}`];

                  return (
                    <div key={questionIndex} className="qa-question pb-2">
                      <button
                        className="flex w-full items-center gap-4 text-left"
                        onClick={() => toggleQuestion(topicIndex, questionIndex)}
                      >
                        {isOpen ? (
                          <ChevronUp className="h-8 w-8" />
                        ) : (
                          <ChevronDown className="h-8 w-8" />
                        )}
                        <h4 className="text-lg font-bold lg:text-2xl">{question.question}</h4>
                      </button>
                      {isOpen && <p className="mt-2 lg:text-lg">{question.answer}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
