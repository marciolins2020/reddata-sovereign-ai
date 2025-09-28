import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";

export const DashboardDemoSection = () => {
  return (
    <section id="dashboard-demo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Veja o <span className="text-primary">RedData em Ação</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Dashboard real da Secretaria de Educação Municipal de Manaus
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Play className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Projeto PoC em produção</span>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Card className="p-2 bg-white/95 border-0 shadow-large">
            <div className="relative bg-white rounded-lg overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <iframe
                src="https://bigdata.redmaxx.com.br/b/semed"
                className="w-full h-full"
                title="RedData Dashboard - SEMED Manaus"
                frameBorder="0"
                allow="fullscreen"
                loading="lazy"
              />
              
              {/* Overlay with info */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Dashboard ao vivo</span>
                </div>
              </div>
              
              <div className="absolute top-4 right-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/90 hover:bg-white"
                  asChild
                >
                  <a 
                    href="https://bigdata.redmaxx.com.br/b/semed" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Abrir em nova aba
                  </a>
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">30 dias</div>
                <div className="text-sm text-muted-foreground">Tempo de implementação</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Dados integrados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoramento ativo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};