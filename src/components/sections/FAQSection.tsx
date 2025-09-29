import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O RedData funciona sem internet?",
    answer: "✅ Sim, via Appliance com IA generativa local. O RedData Appliance foi desenvolvido para operar completamente offline, ideal para ambientes críticos que exigem máxima segurança e não podem depender de conexões externas."
  },
  {
    question: "Pode ser contratado pelo governo?",
    answer: "✅ Sim. Via inexigibilidade, dispensa, FNS, emendas parlamentares e convênios. Como solução 100% nacional e proprietária, o RedData atende todos os requisitos legais para contratação pública."
  },
  {
    question: "Tempo médio de implantação?",
    answer: "✅ 30 a 90 dias, dependendo do ambiente (cloud, VM ou appliance). Nossa metodologia Data Driven Government acelera o processo de implementação com equipes especializadas."
  },
  {
    question: "Diferenciais da RedMaxx?",
    answer: "✅ Empresa 100% nacional, 15+ anos de experiência, plataforma própria e metodologia Data Driven Government. Única empresa brasileira com IA generativa local e total soberania digital."
  },
  {
    question: "RedData é compatível com quais sistemas?",
    answer: "O RedData possui conectores universais que integram com ERPs (SAP, TOTVS, Oracle), sistemas legados, APIs REST, bancos de dados (PostgreSQL, MySQL, Oracle, SQL Server), planilhas Excel, sensores IoT e muito mais."
  },
  {
    question: "Como funciona a segurança dos dados?",
    answer: "Totalmente aderente à LGPD, GDPR e ISO 27001. Criptografia end-to-end, controles de acesso granulares, auditoria completa e arquitetura blindada para ambientes críticos. Certificação de segurança reconhecida internacionalmente."
  },
  {
    question: "Qual o investimento necessário?",
    answer: "O investimento varia conforme a modalidade (SaaS, VM ou Appliance) e volume de dados. Oferecemos simulações personalizadas e modelos de pagamento flexíveis. Entre em contato para uma proposta customizada para sua necessidade."
  },
  {
    question: "RedData substitui ferramentas existentes?",
    answer: "O RedData complementa e potencializa suas ferramentas atuais. Pode integrar com sistemas existentes ou substituir soluções de BI tradicionais, oferecendo capacidades avançadas de IA que outras ferramentas não possuem."
  }
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-gradient-tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Esclarecemos as principais dúvidas sobre o RedData
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm border-0 rounded-lg px-6 shadow-subtle"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm text-primary font-medium">
              Ainda tem dúvidas? Entre em contato conosco
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};