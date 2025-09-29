import { Card } from "@/components/ui/card";
import { 
  Server,
  Globe,
  Brain,
  BarChart3,
  Bot,
  Shield
} from "lucide-react";

const pillars = [
  {
    icon: Server,
    title: "Infraestrutura Flexível e Soberana",
    description: "Roda em nuvem pública, privada, on-premises, em máquinas virtuais ou como appliance local."
  },
  {
    icon: Globe,
    title: "Conector Universal de Dados",
    description: "Poderoso motor de Big Data Analytics que integra dados estruturados e não estruturados de qualquer fonte: ERPs, APIs, CRMs, planilhas, sensores, redes sociais, bancos de dados e sistemas legados. Compatível com Windows, Linux, Unix, macOS, AIX, Solaris e FreeBSD."
  },
  {
    icon: Brain,
    title: "Processamento com IA Preditiva",
    description: "Machine Learning e modelos estatísticos transformam grandes volumes de dados em insights prontos para decisão."
  },
  {
    icon: BarChart3,
    title: "Dashboards Interativos em Tempo Real",
    description: "Visualizações estratégicas personalizáveis, com alertas e relatórios acionáveis."
  },
  {
    icon: Bot,
    title: "IA Generativa Local (sem internet)",
    description: "Assistente embarcado que opera offline e responde em linguagem natural, com diagnósticos automatizados."
  },
  {
    icon: Shield,
    title: "Segurança e Conformidade",
    description: "Totalmente aderente à LGPD, GDPR e ISO 27001. Arquitetura blindada para ambientes críticos."
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-24 bg-gradient-tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona o <span className="text-primary">RedData</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa que conecta, processa e transforma seus dados em inteligência estratégica
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary">6 pilares integrados em uma única plataforma</span>
          </div>
        </div>
      </div>
    </section>
  );
};