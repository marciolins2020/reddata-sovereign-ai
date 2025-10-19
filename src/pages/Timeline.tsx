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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <header className="mb-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Linha do Tempo – RedData × LLMs (2017–2025)
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-3xl">
              Evolução do RedData (acima) em paralelo aos marcos das LLMs open source (abaixo).
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleExportPNG} size="lg">
                Baixar PNG
              </Button>
              <Button onClick={() => window.print()} variant="outline" size="lg">
                Imprimir PDF
              </Button>
            </div>
          </header>

          <div id="timeline-wrapper" className="relative overflow-x-auto py-8 px-2">
            <div className="min-w-[1400px]">
              {/* Track RedData */}
              <section aria-label="Linha do tempo RedData" className="relative mb-32">
                <div className="absolute left-0 right-0 h-[2px] bg-primary/20 top-2"></div>
                <div className="relative flex justify-between items-start pt-6 pb-8">
                  {timelineData.reddata.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[140px] px-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="h-5 w-5 rounded-full bg-primary ring-4 ring-background shadow-lg hover:scale-125 transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 relative z-10"
                        title={`${item.year} – ${item.title}`}
                        aria-label={`${item.year} – ${item.title}`}
                      />
                      <div className="mt-6 text-center">
                        <div className="text-lg font-bold text-foreground mb-1">{item.year}</div>
                        <div className="text-sm text-muted-foreground leading-tight">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-base font-bold text-primary">RedData</div>
              </section>

              {/* Track LLMs */}
              <section aria-label="Linha do tempo LLMs" className="relative mb-8">
                <div className="absolute left-0 right-0 h-[2px] bg-muted top-2"></div>
                <div className="relative flex justify-between items-start pt-6 pb-8">
                  {timelineData.llms.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[140px] px-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="h-5 w-5 rounded-full bg-muted-foreground ring-4 ring-background shadow-lg hover:scale-125 transition-all focus:outline-none focus:ring-4 focus:ring-muted-foreground/30 relative z-10"
                        title={`${item.year} – ${item.title}`}
                        aria-label={`${item.year} – ${item.title}`}
                      />
                      <div className="mt-6 text-center">
                        <div className="text-lg font-bold text-foreground mb-1">{item.year}</div>
                        <div className="text-sm text-muted-foreground leading-tight">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-base font-bold text-muted-foreground">LLMs Open Source</div>
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
