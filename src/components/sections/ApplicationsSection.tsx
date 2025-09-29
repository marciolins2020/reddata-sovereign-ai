import { Card } from "@/components/ui/card";
import { 
  Building,
  Heart,
  GraduationCap,
  DollarSign
} from "lucide-react";

const applications = [
  {
    icon: Building,
    sector: "Governo",
    title: "Gestão Pública Inteligente",
    description: "Combate a fraudes, auditoria automatizada e análise de políticas públicas com IA preditiva.",
    benefits: [
      "Detecção de anomalias em tempo real",
      "Análise automatizada de contratos",
      "Previsão de arrecadação tributária"
    ]
  },
  {
    icon: Heart,
    sector: "Saúde",
    title: "Saúde Baseada em Dados",
    description: "Triagem inteligente, previsão de demanda e fila zero com IA generativa.",
    benefits: [
      "Triagem automatizada de pacientes",
      "Previsão de demanda hospitalar",
      "Otimização de recursos médicos"
    ]
  },
  {
    icon: GraduationCap,
    sector: "Educação",
    title: "Educação Personalizada",
    description: "Análise de evasão, roteirização escolar e desempenho por região.",
    benefits: [
      "Identificação precoce de evasão",
      "Otimização de rotas escolares",
      "Análise de desempenho regional"
    ]
  },
  {
    icon: DollarSign,
    sector: "Finanças",
    title: "Inteligência Financeira",
    description: "Previsão de arrecadação, compliance automatizado e análise de riscos tributários.",
    benefits: [
      "Projeções orçamentárias precisas",
      "Compliance automatizado",
      "Análise de riscos fiscais"
    ]
  }
];

export const ApplicationsSection = () => {
  return (
    <section id="casos-uso" className="py-24 bg-gradient-tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">Aplicações Reais</span> que Transformam Setores
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Veja como o RedData está revolucionando a tomada de decisões em diferentes áreas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((app, index) => (
            <Card key={index} className="p-8 border-0 bg-card/50 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <app.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-primary mb-1">{app.sector}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{app.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{app.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Principais benefícios:</h4>
                <ul className="space-y-2">
                  {app.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold">+15 anos de experiência</span>
            <span className="text-muted-foreground">em projetos de transformação digital</span>
          </div>
        </div>
      </div>
    </section>
  );
};