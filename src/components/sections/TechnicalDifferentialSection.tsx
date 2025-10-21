import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Cpu,
  Zap,
  Shield,
  TrendingUp,
  Gauge,
  Server,
  Layers
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/lib/scroll";

export const TechnicalDifferentialSection = () => {
  const { t } = useLanguage();

  const technicalPoints = [
    {
      icon: Layers,
      title: "Modelo IaaS + SaaS: Infraestrutura e Software integrados em um único equipamento",
      highlight: true
    },
    {
      icon: Cpu,
      title: "GPU NVIDIA otimizada para cargas de IA e machine learning",
    },
    {
      icon: Server,
      title: "SUSE AI – Sistema operacional Linux corporativo otimizado para IA e Big Data",
    },
    {
      icon: Zap,
      title: "Ambiente pronto para análises preditivas e em tempo real",
    },
    {
      icon: Gauge,
      title: "Desempenho até 40% superior em benchmarks de Big Data",
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="diferenciais">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Cpu className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Diferencial Técnico
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-primary">🚀 RedData Appliance</span>
              <br />
              Potência e Soberania em um Único Equipamento
            </h2>
            
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              O <strong>RedData Appliance</strong> é equipado com <strong className="text-primary">GPU NVIDIA de alto desempenho</strong> e o sistema operacional <strong className="text-primary">SUSE AI</strong>, uma versão corporativa do Linux, especialmente otimizada para Inteligência Artificial e Big Data.
            </p>
            
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mt-4 leading-relaxed">
              Essa combinação garante <strong>processamento acelerado de IA, maior eficiência computacional e performance superior</strong> em análises de grandes volumes de dados.
            </p>
            
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mt-4 leading-relaxed">
              Sua arquitetura proporciona <strong>eficiência energética, estabilidade e velocidade excepcionais</strong>, superando soluções equivalentes do mercado e assegurando <strong className="text-primary">soberania tecnológica total</strong>.
            </p>
          </div>

          {/* IaaS + SaaS Highlight Card - Full Width */}
          <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 to-primary/10 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">IaaS + SaaS</span>
                  </div>
                  <p className="text-gray-900 font-bold text-lg leading-relaxed">
                    Modelo Híbrido Completo: Infraestrutura e Software integrados em um único equipamento
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Combine o poder da infraestrutura dedicada com a facilidade de uso do software como serviço
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Points Grid */}
          <TooltipProvider>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {technicalPoints.slice(1).map((point, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 cursor-help">
                            <point.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{point.title}</p>
                        </TooltipContent>
                      </Tooltip>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium leading-relaxed">
                          {point.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TooltipProvider>

          {/* Performance Highlight */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Performance até <span className="text-primary">40% superior</span> em benchmarks de Big Data
                  </h3>
                  <p className="text-gray-700">
                    Arquitetura otimizada para cargas de trabalho intensivas com processamento acelerado por GPU
                  </p>
                </div>

                <Button 
                  size="lg" 
                  onClick={() => scrollToElement('#contact-form')}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Saiba Mais
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sovereignty Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-primary/20 rounded-full">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-gray-900 font-semibold">
                Total Soberania Tecnológica • Dados 100% sob seu Controle
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
