import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Scale, TrendingUp, Shield } from "lucide-react";
import reddataLogo from "@/assets/reddata-logo.png";

export function AuditHero() {
  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-[#E30613]/5 via-background to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <img 
            src={reddataLogo} 
            alt="RedData®" 
            className="h-20 md:h-24 w-auto mx-auto mb-8"
            loading="eager"
          />
          
          <Badge className="mb-6 bg-[#E30613] hover:bg-[#E30613]/90 text-lg px-6 py-2">
            RedData.Audit
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Auditoria Pública com{" "}
            <span className="bg-gradient-to-r from-[#E30613] to-orange-600 bg-clip-text text-transparent">
              Inteligência Artificial
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            A RedData oferece tecnologia e inteligência artificial completas para{" "}
            <strong className="text-foreground">automatizar auditorias</strong> com base em dados oficiais e jurisprudências.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-[#E30613] hover:bg-[#E30613]/90 text-lg px-8 py-6"
              onClick={scrollToContact}
            >
              Fale com a RedMaxx
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById('o-que-e')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Saiba Mais
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-shadow">
            <Brain className="h-12 w-12 text-[#E30613] mb-4" />
            <h3 className="font-semibold text-lg mb-2">Big Data & IA</h3>
            <p className="text-sm text-muted-foreground">
              Análise integrada de processos e documentos
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-shadow">
            <TrendingUp className="h-12 w-12 text-[#E30613] mb-4" />
            <h3 className="font-semibold text-lg mb-2">Redução de Tempo</h3>
            <p className="text-sm text-muted-foreground">
              Até 60% menos tempo em instruções
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-shadow">
            <Scale className="h-12 w-12 text-[#E30613] mb-4" />
            <h3 className="font-semibold text-lg mb-2">Jurisprudência IA</h3>
            <p className="text-sm text-muted-foreground">
              Busca inteligente de decisões correlatas
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 text-[#E30613] mb-4" />
            <h3 className="font-semibold text-lg mb-2">Conformidade Total</h3>
            <p className="text-sm text-muted-foreground">
              Relatórios para TCU, TCE e controladorias
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
