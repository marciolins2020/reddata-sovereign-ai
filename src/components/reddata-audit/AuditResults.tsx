import { Card, CardContent } from "@/components/ui/card";

export function AuditResults() {
  const results = [
    { value: "60%", label: "Redução no tempo de elaboração de instruções preliminares" },
    { value: "94%", label: "Acurácia na identificação de riscos e irregularidades" },
    { value: "88%", label: "Taxa de aceitação das recomendações da IA pelos auditores" },
    { value: "3x", label: "Aumento na produtividade dos fiscais e alcance das auditorias" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Resultados Comprovados
          </h2>
          <p className="text-xl text-muted-foreground">
            Impacto real na eficiência e qualidade das auditorias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, idx) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-[#E30613]/5 to-background">
              <CardContent className="pt-8 pb-8">
                <div className="text-5xl font-bold text-[#E30613] mb-3">
                  {result.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
