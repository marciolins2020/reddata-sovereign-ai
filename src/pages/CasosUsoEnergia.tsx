import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, TrendingUp, Shield, BarChart3, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import enelDashboard from "@/assets/enel-dashboard.jpeg";
import enelLogo from "@/assets/enel-logo.png";

const CasosUsoEnergia = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para página principal
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Energia</h1>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nesta vertical de negócios, a RedMaxx, por meio da plataforma proprietária RedData, 
            realiza a transformação digital das operações energéticas com foco em confiabilidade, 
            prevenção de falhas e eficiência operacional. O RedData integra dados de sensores, 
            sistemas legados e operações em tempo real, aplicando Big Data e Inteligência Artificial 
            para gerar insights preditivos, dashboards inteligentes e automação de processos críticos, 
            permitindo que empresas de energia reduzam custos, aumentem a disponibilidade da rede e 
            assegurem maior segurança para seus clientes.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-background border border-border">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Eficiência Operacional</h3>
              <p className="text-muted-foreground">
                Otimização de recursos e redução de custos com manutenção corretiva
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Maior Confiabilidade</h3>
              <p className="text-muted-foreground">
                Manutenção preditiva que antecipa falhas e reduz tempo de indisponibilidade
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Insights em Tempo Real</h3>
              <p className="text-muted-foreground">
                Dashboards inteligentes para tomada de decisão orientada por dados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={enelLogo} 
                  alt="Logo Enel" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Case: Enel (SP)</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              A Enel enfrentava o desafio de lidar com grandes volumes de dados dispersos, sem 
              visibilidade consolidada sobre a saúde da rede elétrica. A RedMaxx implementou o 
              RedData como plataforma central de análise e monitoramento, conectando múltiplas 
              fontes de dados e aplicando algoritmos preditivos para antecipar falhas.
            </p>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 mb-12 border border-primary/20">
            <h3 className="text-2xl font-semibold mb-6">Principais entregas e resultados:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Dashboards em tempo real para acompanhamento da rede elétrica
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Manutenção preditiva, reduzindo falhas operacionais e tempo de indisponibilidade
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Aumento da confiabilidade no fornecimento de energia, com melhoria significativa nos indicadores de continuidade
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Otimização dos recursos técnicos, reduzindo custos de manutenção corretiva
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Image */}
          <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
            <img 
              src={enelDashboard} 
              alt="Dashboard RedData - Predição de Anomalias em Religadoras Automáticas - Projeto Enel"
              className="w-full h-auto"
            />
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
            <p className="text-lg font-medium text-center">
              Com o RedData, a Enel passou a atuar de forma proativa e orientada por dados, 
              garantindo maior eficiência, segurança e sustentabilidade em suas operações.
            </p>
          </div>

          {/* Scientific Article Section */}
          <div className="mt-8 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Artigo Científico</h3>
                <p className="text-muted-foreground mb-4">
                  Este projeto gerou um artigo científico desenvolvido a pedido da própria Enel, 
                  documentando os resultados e metodologias aplicadas na predição de falhas em religadoras automáticas.
                </p>
                <a 
                  href="/enel-scientific-article.pdf" 
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Baixar Artigo Científico
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transforme suas operações energéticas
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Descubra como o RedData pode revolucionar a gestão da sua empresa
          </p>
          <Link to="/#contact-form">
            <Button size="lg" className="gap-2">
              Solicitar Demonstração
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CasosUsoEnergia;
