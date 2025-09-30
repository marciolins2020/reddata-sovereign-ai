import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, TrendingUp, Shield, BarChart3, Users, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import prefeituraDashboard from "@/assets/prefeitura-manaus-dashboard.png";
import adsLogo from "@/assets/ads-logo.png";
import semefLogo from "@/assets/semef-logo.png";
import adsDashboard from "@/assets/ads-dashboard.png";

const CasosUsoGoverno = () => {
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
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Governo</h1>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Na vertical de Governo, a RedMaxx promove a transformação digital da gestão pública com sua 
            plataforma proprietária RedData, aplicando Big Data, Inteligência Artificial e automação para 
            modernizar processos, ampliar a transparência e aumentar a eficiência operacional. A plataforma 
            se conecta a sistemas internos, bancos de dados públicos e serviços em nuvem, criando uma base 
            unificada de inteligência para apoiar decisões estratégicas, reduzir desperdícios e melhorar a 
            qualidade dos serviços prestados ao cidadão.
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
                Modernização de processos com redução de desperdícios e otimização de recursos públicos
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transparência e Governança</h3>
              <p className="text-muted-foreground">
                Monitoramento em tempo real e prestação de contas orientada por dados
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Decisões Estratégicas</h3>
              <p className="text-muted-foreground">
                Inteligência analítica para políticas públicas baseadas em evidências
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 1: ADS */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={adsLogo} 
                  alt="Logo ADS - Agência de Desenvolvimento Sustentável do Amazonas" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Case: ADS – Agência de Desenvolvimento Sustentável do Amazonas</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              A ADS buscava maior controle sobre seus convênios, contratos e ações de fomento, enfrentando 
              desafios de visibilidade, integração de dados e acompanhamento em tempo real das suas iniciativas. 
              Com o RedData, a RedMaxx estruturou um projeto de gestão inteligente, com foco em monitoramento 
              estratégico e governança baseada em dados.
            </p>

            <div className="mb-8 rounded-xl overflow-hidden border border-border shadow-lg">
              <img 
                src={adsDashboard} 
                alt="Dashboard do sistema RedData para ADS mostrando subvenção de Piaçava com controles e mapas" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Results ADS */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 mb-16 border border-primary/20">
            <h3 className="text-2xl font-semibold mb-6">Principais entregas e resultados:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Implementação da plataforma RedData com integração a bancos de dados internos e sistemas legados
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Criação de dashboards estratégicos para acompanhamento de convênios e execuções financeiras
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Modelos analíticos para projeções e avaliação de impacto de projetos
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Capacitação da equipe da ADS para uso contínuo da ferramenta com autonomia
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Melhoria da transparência e da prestação de contas junto aos órgãos de controle
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg border border-border mb-16">
            <p className="text-lg font-medium text-center">
              Com o RedData, a ADS passou a operar com inteligência analítica, monitorando em tempo real 
              suas políticas públicas e decisões estratégicas.
            </p>
          </div>

          {/* Case Study 2: Prefeitura de Manaus */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={semefLogo} 
                  alt="Logo SEMEF - Secretaria Municipal da Fazenda de Manaus" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Case: Prefeitura de Manaus – Modernização do ITBI e IPTU</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              A Secretaria Municipal da Fazenda (SEMEF) enfrentava o desafio de melhorar a arrecadação e combater 
              a inadimplência no ITBI e IPTU, lidando com informações descentralizadas e pouca inteligência sobre 
              o comportamento do contribuinte. A RedMaxx, com a plataforma RedData, implantou um modelo de governança 
              tributária orientada por dados.
            </p>
            
            <div className="mb-8 rounded-xl overflow-hidden border border-border shadow-lg">
              <img 
                src={prefeituraDashboard} 
                alt="Dashboard do sistema OUV IPTU/ITBI da Prefeitura de Manaus mostrando mapa interativo com dados de imóveis" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Results Prefeitura */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 mb-12 border border-primary/20">
            <h3 className="text-2xl font-semibold mb-6">Principais entregas e resultados:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Consolidação de dados fiscais, geográficos e cadastrais em um ambiente analítico único
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Análise preditiva para identificar imóveis subavaliados e inconsistências tributárias
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Segmentação de contribuintes com base em comportamento de pagamento
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Painéis interativos para tomada de decisão por parte da gestão tributária
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  Aumento significativo da capacidade de fiscalização e recuperação de receita
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg border border-border">
            <p className="text-lg font-medium text-center">
              Com o RedData, a Prefeitura passou a ter uma visão integrada da base territorial e tributária 
              da cidade, otimizando estratégias de arrecadação e ampliando a justiça fiscal.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Modernize a gestão pública com inteligência de dados
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Descubra como o RedData pode transformar a administração pública
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

export default CasosUsoGoverno;
