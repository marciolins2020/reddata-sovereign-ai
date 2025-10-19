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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-12">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Linha do Tempo – RedData × LLMs (2017–2025)
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
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
          </div>

          <div id="timeline-wrapper" className="bg-background py-8">
            {/* RedData Timeline */}
            <div className="mb-24">
              <div className="text-lg font-bold text-primary mb-4">RedData</div>
              <div className="relative">
                <div className="absolute left-0 right-0 h-0.5 bg-primary/20 top-3"></div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-8 relative">
                  {timelineData.reddata.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="h-6 w-6 rounded-full bg-primary shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-primary/30 relative z-10 mb-6"
                        title={`${item.year} – ${item.title}`}
                        aria-label={`${item.year} – ${item.title}`}
                      />
                      <div className="space-y-2">
                        <div className="text-base font-bold">{item.year}</div>
                        <div className="text-sm text-muted-foreground">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LLMs Timeline */}
            <div>
              <div className="text-lg font-bold text-muted-foreground mb-4">LLMs Open Source</div>
              <div className="relative">
                <div className="absolute left-0 right-0 h-0.5 bg-muted top-3"></div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
                  {timelineData.llms.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="h-6 w-6 rounded-full bg-muted-foreground shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-muted-foreground/30 relative z-10 mb-6"
                        title={`${item.year} – ${item.title}`}
                        aria-label={`${item.year} – ${item.title}`}
                      />
                      <div className="space-y-2">
                        <div className="text-base font-bold">{item.year}</div>
                        <div className="text-sm text-muted-foreground">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
          <p className="leading-relaxed mt-4">
            {selectedItem?.detail}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Timeline;
