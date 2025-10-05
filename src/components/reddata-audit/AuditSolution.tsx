import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function AuditSolution() {
  const solutions = [
    {
      title: "Integração Automática",
      description: "RedData.Audit conecta-se a sistemas de controle interno e externo (SIAFI, SICONV, e-Sfinge, ComprasNet), consolidando dados em tempo real"
    },
    {
      title: "IA Generativa para Relatórios",
      description: "O sistema gera pré-relatórios técnicos automaticamente, extraindo informações-chave e identificando inconsistências"
    },
    {
      title: "Jurisprudência Inteligente",
      description: "Busca semântica baseada em IA encontra decisões correlatas e tendências jurisprudenciais relevantes em segundos"
    },
    {
      title: "Padronização e Qualidade",
      description: "Modelos de machine learning garantem análises consistentes entre diferentes auditores e casos similares"
    },
    {
      title: "IA Explicável (XAI)",
      description: "Transparência total: você entende exatamente como e por que a IA chegou a cada conclusão"
    },
    {
      title: "Aprendizado Contínuo",
      description: "O sistema aprende com feedbacks dos fiscais, melhorando continuamente sua acurácia e assertividade"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#E30613]/5 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como a RedData.Audit Resolve
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tecnologia e inteligência artificial trabalhando para aumentar a eficiência das auditorias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow bg-background/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#E30613] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
