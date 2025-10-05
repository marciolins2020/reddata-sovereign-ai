import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AuditFAQ() {
  const faqs = [
    {
      question: "O RedData.Audit substitui os auditores?",
      answer: "Não. O sistema é uma ferramenta de apoio que automatiza tarefas repetitivas e fornece insights baseados em dados, permitindo que os auditores se concentrem em análises estratégicas e decisões que exigem julgamento humano. A palavra final sempre é do auditor."
    },
    {
      question: "Como funciona a segurança dos dados?",
      answer: "O RedData.Audit opera 100% on-premises ou em nuvem privada, com total conformidade com LGPD, GDPR e ISO 27001. Os dados nunca saem do ambiente do tribunal e toda a comunicação é criptografada. A solução pode operar totalmente offline se necessário."
    },
    {
      question: "Quanto tempo leva a implementação?",
      answer: "A implementação típica leva de 30 a 60 dias, incluindo integração com sistemas existentes, treinamento da equipe e customização de modelos de IA para as especificidades do tribunal. O tempo pode variar conforme a complexidade das integrações necessárias."
    },
    {
      question: "A IA pode ser auditada?",
      answer: "Sim! O módulo XAI (IA Explicável) garante total transparência nas decisões do sistema. Cada análise, classificação de risco ou recomendação vem acompanhada de explicação detalhada sobre os fatores considerados e pesos utilizados, permitindo auditoria completa do processo."
    },
    {
      question: "Precisa de internet para funcionar?",
      answer: "Não obrigatoriamente. O RedData.Audit pode operar 100% offline quando instalado como appliance local. Para soluções em nuvem privada, é necessária conectividade apenas para atualizações e sincronização de dados externos (quando aplicável)."
    },
    {
      question: "Como é feito o treinamento da equipe?",
      answer: "Oferecemos treinamento completo em três modalidades: presencial, remoto e e-learning. O programa inclui capacitação técnica para uso da plataforma, interpretação de resultados da IA e boas práticas de auditoria com apoio tecnológico. Suporte contínuo está disponível após o go-live."
    },
    {
      question: "A solução se integra com nossos sistemas atuais?",
      answer: "Sim. O RedData.Audit possui conectores nativos para SIAFI, SICONV, e-Sfinge, ComprasNet, SEI e principais sistemas de gestão pública. Também desenvolvemos integrações customizadas para sistemas específicos via API REST quando necessário."
    },
    {
      question: "Qual o investimento necessário?",
      answer: "O investimento varia conforme o porte do tribunal, número de usuários, módulos contratados e modelo de implementação (appliance, nuvem privada ou híbrida). Entre em contato para receber uma proposta personalizada e demonstração do ROI esperado para sua instituição."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre o RedData.Audit
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
