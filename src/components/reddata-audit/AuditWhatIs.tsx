import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle, Target } from "lucide-react";

export function AuditWhatIs() {
  return (
    <section id="o-que-e" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Que é o RedData.Audit?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compreenda o sistema de auditoria inteligente para tribunais de contas e órgãos de controle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-12 w-12 text-[#E30613] mb-4" />
              <CardTitle>Definição</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                O <strong>RedData.Audit</strong> é uma solução avançada de Big Data e Inteligência Artificial 
                desenvolvida pela RedMaxx para apoiar órgãos de controle na análise automatizada de processos, 
                instruções e relatórios técnicos.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <AlertCircle className="h-12 w-12 text-[#E30613] mb-4" />
              <CardTitle>Tecnologia 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Construído sobre a <strong>Plataforma RedData</strong>, o sistema consolida dados, 
                identifica padrões, gera análises preditivas e elabora pré-relatórios de auditoria 
                com base em evidências e jurisprudências anteriores.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-[#E30613] mb-4" />
              <CardTitle>Possibilidade de Eficiência</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Tribunais podem <strong>aumentar a produtividade</strong> baseados em automação 
                documental e IA explicável, desde que cumpram os requisitos de segurança e 
                conformidade com LGPD e ISO 27001.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
