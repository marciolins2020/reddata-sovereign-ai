import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import html2canvas from "html2canvas";
import reddataLogo from "@/assets/reddata-logo-timeline.png";

interface TimelineItem {
  year: string;
  title: string;
  detailHtml: string;
}

const timelineData = {
  reddata: [
    {
      year: "2017",
      title: "Concepção, Pesquisa Inicial e Desenvolvimento do KDD",
      detailHtml: `<ul class="list-disc pl-5 space-y-1">
  <li>Início do projeto RedData em parceria com <strong>instituto designado pelo fundo de P&amp;D</strong>, com foco em Big Data e Inteligência Artificial aplicados ao setor público e privado.</li>
  <li>Definição da <strong>arquitetura base da plataforma</strong> e do <strong>framework de integração de dados massivos</strong>, que viria a dar origem ao <strong>KDD – Knowledge Discovery in Databases</strong>.</li>
  <li>Desenvolvimento inicial do <strong>KDD</strong>, processo estruturado para descoberta de conhecimento a partir de grandes volumes de dados, composto por etapas como:</li>
  <ul class="list-[circle] pl-6 space-y-1">
    <li>Seleção e integração de dados (extração de múltiplas fontes).</li>
    <li>Limpeza e pré-processamento (padronização, tratamento de inconsistências).</li>
    <li>Transformação e mineração de dados (uso de algoritmos para identificar padrões).</li>
    <li>Interpretação e visualização (conversão em insights e relatórios estratégicos).</li>
  </ul>
  <li>Esse método serviu como <strong>base metodológica do RedData</strong>, permitindo pipelines automatizados e rastreáveis.</li>
</ul>`
    },
    {
      year: "2018",
      title: "Desenvolvimento Colaborativo e Mentoria IBM",
      detailHtml: `<ul class="list-disc pl-5 space-y-1">
  <li><strong>Entrada no programa de startups da IBM</strong>, com acesso à IBM Cloud e mentoria técnica (machine learning, arquitetura de dados, DevOps).</li>
  <li>Otimização do pipeline KDD, adoção de <strong>boas práticas de governança de dados</strong> e estruturação da <strong>camada de inteligência analítica</strong> do RedData.</li>
  <li>Conclusão de versões experimentais com apoio multidisciplinar e <strong>testes de desempenho</strong> em ambientes corporativos e governamentais.</li>
</ul>`
    },
    {
      year: "2019",
      title: "Desenvolvimento Interno e Provas de Conceito (PoCs)",
      detailHtml: `<ul class="list-disc pl-5 space-y-1">
  <li><strong>Internalização total</strong> do desenvolvimento pela equipe RedMaxx.</li>
  <li>PoCs em varejo, governo e indústria, validando <strong>escalabilidade</strong>.</li>
  <li>Inclusão dos primeiros <strong>módulos de machine learning</strong> e modelagem preditiva.</li>
</ul>`
    },
    {
      year: "2020",
      title: "Lançamento Comercial e Adoção Privada",
      detailHtml: `<ul class="list-disc pl-5 space-y-1">
  <li>Lançamento da <strong>versão comercial</strong> do RedData.</li>
  <li>Primeiros projetos em energia, indústria e varejo.</li>
  <li>Consolidação do modelo <strong>SaaS</strong> e de <strong>dashboards analíticos interativos</strong>.</li>
</ul>`
    },
    {
      year: "2021",
      title: "Entrada no Setor Público e Avanço das LLMs Open Source",
      detailHtml: `<ul class="list-disc pl-5 space-y-1">
  <li>Primeiro contrato público com órgãos pioneiros na adoção de IA nacional.</li>
  <li>RedData reconhecido como <strong>plataforma 100% proprietária e soberana</strong>.</li>
  <li><strong>EleutherAI</strong> lança <strong>GPT-Neo (2021)</strong> e <strong>GPT-J (jun/2021)</strong>, marcos open source compatíveis com GPT-3, inspirando estudos de IA generativa na RedMaxx.</li>
  <li>Início de <strong>experimentos internos</strong> com modelos de linguagem aplicados a dados governamentais.</li>
</ul>`
    },
    {
      year: "2022–2023",
      title: "Expansão, IA Generativa e Soberania Tecnológica",
      detailHtml: `<ul class="list-disc pl-5 space-y-1">
  <li>Ampliação de projetos em governos estaduais, municipais e tribunais de contas.</li>
  <li>Introdução de <strong>IA generativa</strong> e <strong>diagnósticos inteligentes</strong>.</li>
  <li><strong>Meta lança LLaMA (fev/2023)</strong>, catalisando o ecossistema open source.</li>
  <li><strong>Mistral 7B (out/2023)</strong> e <strong>Mixtral 8×7B (dez/2023)</strong> (Apache 2.0) viabilizam <strong>execução offline</strong> e base do <strong>RedData Appliance</strong>.</li>
  <li>Módulos embarcados de IA local para ambientes com <strong>alta restrição de rede</strong> e dados sensíveis.</li>
</ul>`
    },
    {
      year: "2024–2025",
      title: "Consolidação, Homologações e Soberania Digital",
      detailHtml: `<ul class="list-disc pl-5 space-y-1">
  <li>RedData consolida-se como <strong>plataforma líder</strong> no setor público brasileiro.</li>
  <li>Integração de <strong>LLaMA 3</strong> e <strong>Mistral 7B/Mixtral 8×7B</strong> com <strong>execução 100% offline</strong> para diagnóstico, previsão e auditoria automatizada.</li>
  <li><strong>Homologação NVIDIA (2025)</strong> – operação oficial em <strong>RTX e A100</strong>, com <strong>CUDA e TensorRT</strong>.</li>
  <li><strong>Migração para SUSE Linux AI (2025)</strong> – substitui Debian; compatível com <strong>NVIDIA AI Enterprise</strong>.</li>
  <li><strong>Parceria SERPRO (2025)</strong> – implantação na <strong>AWS</strong> em <strong>modelo de bilhetagem</strong>, com integração ao <strong>Marketplace SERPRO</strong>.</li>
  <li>Reconhecimento por <strong>independência tecnológica</strong>, <strong>LGPD/ISO 27001</strong> e <strong>soberania digital</strong>.</li>
</ul>`
    }
  ],
  llms: [
    { year: "2019", title: "GPT-2 (OpenAI)", detailHtml: "<p>Popularizou modelos grandes para pesquisa.</p>" },
    { year: "2021", title: "GPT-Neo & GPT-J (EleutherAI)", detailHtml: "<p>Open source compatíveis com GPT-3; base para customização local.</p>" },
    { year: "2023", title: "LLaMA (Meta)", detailHtml: "<p>Catalisou o ecossistema open source e os modos locais.</p>" },
    { year: "2023", title: "Mistral 7B & Mixtral 8×7B", detailHtml: "<p>Modelos leves e eficientes (Apache 2.0), ideais para execução offline e MoE.</p>" },
    { year: "2024", title: "LLaMA 3", detailHtml: "<p>Melhorias relevantes em entendimento e instrução.</p>" },
    { year: "2025", title: "Apoio NVIDIA ao LLaMA", detailHtml: "<p>Refinamento e otimizações para execução local e enterprise.</p>" }
  ]
};

const yearToCol = (year: string): number => {
  const map: Record<string, number> = {
    "2017": 1, "2018": 3, "2019": 5, "2020": 7,
    "2021": 8, "2022–2023": 10, "2023": 10,
    "2024": 11, "2025": 12, "2024–2025": 12
  };
  return map[year] || 12;
};

const TimelineNode = ({ item, color }: { item: TimelineItem; color: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={nodeRef}
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <button
        className={`h-4 w-4 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 ring-2 ring-background relative z-10`}
        style={{ backgroundColor: color }}
        title={`${item.year} – ${item.title}`}
        aria-label={`${item.year} – ${item.title}`}
      />
    </div>
  );
};

const Timeline = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<'reddata' | 'llms'>('reddata');

  const handleExportPNG = async () => {
    const element = document.getElementById('timeline-wrapper');
    if (element) {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#FFFFFF" });
      const link = document.createElement("a");
      link.download = "linha-do-tempo-reddata-llms.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleItemClick = (item: TimelineItem, track: 'reddata' | 'llms', index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    setCurrentTrack(track);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedItem(timelineData[currentTrack][newIndex]);
    }
  };

  const handleNext = () => {
    const maxIndex = timelineData[currentTrack].length - 1;
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedItem(timelineData[currentTrack][newIndex]);
    }
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < timelineData[currentTrack].length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-12">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Linha do Tempo – RedData × LLMs (2017–2025)
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
              Evolução do RedData (acima) em paralelo aos marcos das LLMs open source (abaixo). Ao clicar nos pontos, abre um resumo. Abaixo, o conteúdo completo já expandido.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleExportPNG} size="lg">
                Baixar PNG
              </Button>
              <Button onClick={() => window.print()} variant="outline" size="lg">
                Imprimir PDF
              </Button>
            </div>
          </div>

          <div id="timeline-wrapper" className="relative overflow-x-auto">
            <div className="min-w-[1200px] py-8">
              {/* Logo RedData */}
              <div className="flex justify-center mb-12">
                <img 
                  src={reddataLogo} 
                  alt="RedData Logo" 
                  className="h-16 md:h-20 w-auto opacity-90"
                />
              </div>

              {/* Track RedData */}
              <section aria-label="Linha do tempo RedData" className="relative mb-16">
                <div className="h-px bg-border translate-y-2"></div>
                <div className="relative grid grid-cols-12 gap-4">
                  {timelineData.reddata.map((item, idx) => {
                    const col = yearToCol(item.year);
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center"
                        style={{ gridColumn: `${col} / span 2` }}
                        onClick={() => handleItemClick(item, 'reddata', idx)}
                      >
                        <TimelineNode item={item} color="hsl(var(--primary))" />
                        <div className="mt-4 space-y-2">
                          <div className="text-base font-bold text-primary">{item.year}</div>
                          <div className="text-sm text-muted-foreground">{item.title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-sm font-semibold text-primary">RedData</div>
              </section>
            </div>
          </div>

          {/* Resumo Expandido */}
          <section className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Resumo Expandido (Conteúdo Completo)</h2>
            
            {/* RedData Section */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">RedData</h3>
              <div className="space-y-6">
                {timelineData.reddata.map((item, idx) => (
                  <article key={idx} className="border border-border rounded-xl p-5 shadow-sm bg-card">
                    <h4 className="text-base md:text-lg font-bold mb-3">
                      {item.year} – {item.title}
                    </h4>
                    <div 
                      className="prose prose-sm max-w-none text-foreground"
                      dangerouslySetInnerHTML={{ __html: item.detailHtml }}
                    />
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedItem?.title}</DialogTitle>
            <p className="text-2xl font-bold text-[#E2211C] mt-2">{selectedItem?.year}</p>
          </DialogHeader>
          <div 
            className="prose prose-sm max-w-none leading-relaxed mt-4 text-foreground"
            dangerouslySetInnerHTML={{ __html: selectedItem?.detailHtml || '' }}
          />
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <Button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} de {timelineData[currentTrack].length}
            </span>
            <Button
              onClick={handleNext}
              disabled={!canGoNext}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              Próximo
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Timeline;
