import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import html2canvas from "html2canvas";

interface TimelineItem {
  year: string;
  title: string;
  detail: string;
}

const timelineData = {
  reddata: [
    { year: "2017", title: "Concepção, Pesquisa e KDD", detail: "Parceria com instituto de P&D; definição da arquitetura e do framework KDD (seleção, limpeza, transformação/mineração e interpretação/visualização)." },
    { year: "2018", title: "Mentoria IBM Startups", detail: "Mentoria em ML, arquitetura de dados e DevOps; otimização do pipeline KDD na IBM Cloud." },
    { year: "2019", title: "Desenvolvimento Interno + PoCs", detail: "Internalização total; PoCs em varejo e governo; primeiros módulos de ML e predição." },
    { year: "2020", title: "Lançamento Comercial", detail: "Projetos privados; SaaS e dashboards interativos." },
    { year: "2021", title: "Primeiro Cliente Público", detail: "Entrada no setor público; plataforma 100% proprietária e soberana." },
    { year: "2023", title: "IA Embarcada", detail: "Módulos locais offline para ambientes isolados e dados sensíveis." },
    { year: "2024–2025", title: "Consolidação e Soberania", detail: "Integração LLaMA 3 e Mistral/Mixtral; homologação NVIDIA (RTX/A100, CUDA/TensorRT) e migração para SUSE Linux AI (substitui Debian). AWS em bilhetagem com SERPRO (Marketplace) até o fim de 2025." }
  ],
  llms: [
    { year: "2019", title: "GPT-2 (OpenAI)", detail: "Popularizou modelos grandes para pesquisa." },
    { year: "2021", title: "GPT-Neo & GPT-J (EleutherAI)", detail: "Open source compatíveis com GPT-3; base para customização local." },
    { year: "2023", title: "LLaMA (Meta)", detail: "Catalisou o ecossistema open source e os modos locais." },
    { year: "2023", title: "Mistral 7B & Mixtral 8×7B", detail: "Modelos leves e eficientes (Apache 2.0), ideais para execução offline e MoE." },
    { year: "2024", title: "LLaMA 3", detail: "Melhorias relevantes em entendimento e instrução." },
    { year: "2025", title: "Apoio NVIDIA ao LLaMA", detail: "Refinamento e otimizações para execução local e enterprise." }
  ]
};

const Timeline = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  const yearToCol = (year: string): number => {
    const map: Record<string, number> = {
      "2017": 1, "2018": 3, "2019": 5, "2020": 7,
      "2021": 8, "2023": 10, "2024–2025": 12, "2024": 11, "2025": 12
    };
    return map[year] || 12;
  };

  const TimelineNode = ({ item, color }: { item: TimelineItem; color: string }) => {
    const col = yearToCol(item.year);
    
    return (
      <div 
        className="col-span-2 relative group animate-fade-in"
        style={{ gridColumn: `${col} / span 2` }}
      >
        <button
          onClick={() => setSelectedItem(item)}
          className="mx-auto block h-4 w-4 rounded-full ring-2 ring-white shadow-md hover:scale-125 transition-transform focus:outline-none focus:ring-4 focus:ring-primary/20"
          style={{ backgroundColor: color }}
          title={`${item.year} – ${item.title}`}
          aria-label={`${item.year} – ${item.title}`}
        />
        <div className="mt-4 text-center">
          <div className="text-sm font-semibold">{item.year}</div>
          <div className="text-sm text-muted-foreground">{item.title}</div>
        </div>
      </div>
    );
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Linha do Tempo – RedData × LLMs (2017–2025)
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Evolução do RedData (acima) em paralelo aos marcos das LLMs open source (abaixo).
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleExportPNG} className="bg-primary hover:bg-primary/90">
                Baixar PNG
              </Button>
              <Button onClick={() => window.print()} variant="outline">
                Imprimir PDF
              </Button>
            </div>
          </header>

          <div id="timeline-wrapper" className="relative overflow-x-auto">
            <div className="min-w-[1100px]">
              {/* Track RedData */}
              <section aria-label="Linha do tempo RedData" className="relative mb-16">
                <div className="h-px bg-border translate-y-6"></div>
                <div className="relative grid grid-cols-12 gap-4 mt-0">
                  {timelineData.reddata.map((item, idx) => (
                    <TimelineNode key={idx} item={item} color="#E2211C" />
                  ))}
                </div>
                <div className="mt-2 text-sm font-semibold text-primary">RedData</div>
              </section>

              {/* Track LLMs */}
              <section aria-label="Linha do tempo LLMs" className="relative">
                <div className="h-px bg-border translate-y-6"></div>
                <div className="relative grid grid-cols-12 gap-4 mt-0">
                  {timelineData.llms.map((item, idx) => (
                    <TimelineNode key={idx} item={item} color="#9CA3AF" />
                  ))}
                </div>
                <div className="mt-2 text-sm font-semibold text-muted-foreground">LLMs Open Source</div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedItem?.title}</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">{selectedItem?.year}</p>
          </DialogHeader>
          <p className="text-foreground leading-relaxed mt-4">
            {selectedItem?.detail}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Timeline;
