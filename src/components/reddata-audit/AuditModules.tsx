import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, Brain, TrendingUp, Shield } from "lucide-react";

export function AuditModules() {
  const modules = [
    {
      icon: FileText,
      title: "Análise de Documentos",
      description: "Geração automática de pré-relatórios técnicos com extração semântica de informações-chave"
    },
    {
      icon: Scale,
      title: "Jurisprudência Inteligente",
      description: "Busca semântica de decisões correlatas com ranqueamento de relevância e tendências"
    },
    {
      icon: AlertTriangle,
      title: "Gestão de Riscos",
      description: "Cálculo automático de índices de risco e alertas para indicadores críticos"
    },
    {
      icon: Brain,
      title: "IA Explicável (XAI)",
      description: "Visualização transparente de como e por que a IA chegou a cada conclusão"
    },
    {
      icon: TrendingUp,
      title: "Aprendizado Contínuo",
      description: "Reprocessamento automático de feedbacks para aprimoramento dos modelos"
    },
    {
      icon: Shield,
      title: "Benchmarking",
      description: "Medição de desempenho e identificação de boas práticas institucionais"
    }
  ];

  return (
    <section id="modulos" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Módulos da Plataforma
          </h2>
          <p className="text-xl text-muted-foreground">
            6 componentes integrados para auditoria inteligente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <module.icon className="h-12 w-12 text-[#E30613] mb-4" />
                <CardTitle className="text-xl">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{module.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
