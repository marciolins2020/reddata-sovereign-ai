import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Scale, Shield } from "lucide-react";

export function AuditCases() {
  const cases = [
    {
      icon: Scale,
      entity: "Tribunal de Contas Estadual",
      state: "São Paulo",
      challenge: "Análise de mais de 5.000 processos de licitação por ano com equipe reduzida",
      solution: "Implementação do módulo de Análise de Documentos com IA para triagem automática",
      results: [
        "Redução de 65% no tempo de análise preliminar",
        "Identificação de 320 processos com riscos críticos",
        "Padronização de 100% dos relatórios técnicos"
      ]
    },
    {
      icon: Building2,
      entity: "Controladoria-Geral Municipal",
      state: "Manaus - AM",
      challenge: "Dificuldade para cruzar dados de contratos com execução orçamentária",
      solution: "Integração do RedData.Audit com sistemas SIAFI e e-Sfinge",
      results: [
        "Detecção automática de inconsistências contratuais",
        "Aumento de 40% na cobertura de auditorias",
        "Economia de R$ 2,4 milhões identificados em irregularidades"
      ]
    },
    {
      icon: Shield,
      entity: "Órgão de Controle Interno",
      state: "Distrito Federal",
      challenge: "Análise manual de jurisprudências para casos complexos consumia semanas",
      solution: "Módulo de Jurisprudência Inteligente com busca semântica",
      results: [
        "Redução de 80% no tempo de pesquisa jurisprudencial",
        "Acesso a mais de 10.000 decisões correlatas",
        "Fundamentação técnica mais robusta nos pareceres"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cases de Sucesso
          </h2>
          <p className="text-xl text-muted-foreground">
            Tribunais e órgãos de controle que já transformaram suas auditorias
          </p>
        </div>

        <div className="space-y-8">
          {cases.map((caseItem, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#E30613]/10 rounded-lg">
                    <caseItem.icon className="h-8 w-8 text-[#E30613]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl">{caseItem.entity}</CardTitle>
                      <Badge variant="outline">{caseItem.state}</Badge>
                    </div>
                    <CardDescription className="text-base">
                      <strong>Desafio:</strong> {caseItem.challenge}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    <strong>Solução:</strong> {caseItem.solution}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Resultados:</p>
                  <ul className="space-y-2">
                    {caseItem.results.map((result, resultIdx) => (
                      <li key={resultIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-[#E30613] font-bold text-lg">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
