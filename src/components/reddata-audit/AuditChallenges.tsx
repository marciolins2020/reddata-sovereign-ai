import { Card, CardContent } from "@/components/ui/card";
import { Database, Clock, FileSearch, Users } from "lucide-react";

export function AuditChallenges() {
  const challenges = [
    {
      icon: Database,
      title: "Dados Fragmentados",
      description: "Tribunais têm dificuldade para analisar processos, contratos e relatórios de forma integrada"
    },
    {
      icon: Clock,
      title: "Processo Complexo",
      description: "Elaborar instruções técnicas e relatórios preliminares demanda tempo e expertise específica"
    },
    {
      icon: FileSearch,
      title: "Busca Manual",
      description: "Pesquisar jurisprudências e precedentes relevantes é trabalhoso e pode deixar de fora decisões importantes"
    },
    {
      icon: Users,
      title: "Falta de Padronização",
      description: "Diferentes auditores podem analisar casos similares de formas distintas, impactando a consistência"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Os Desafios dos Tribunais de Contas
          </h2>
          <p className="text-xl text-muted-foreground">
            Principais obstáculos enfrentados por auditores e fiscais no dia a dia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#E30613]/10 rounded-lg">
                    <challenge.icon className="h-8 w-8 text-[#E30613]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                    <p className="text-muted-foreground">{challenge.description}</p>
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
