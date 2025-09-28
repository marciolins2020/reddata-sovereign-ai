import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Server, Settings } from "lucide-react";

const vmProviders = [
  { name: "Hyper-V", logo: "🖥️" },
  { name: "VMware", logo: "⚡" },
  { name: "Proxmox", logo: "🔧" },
  { name: "KVM", logo: "🐧" },
  { name: "VirtualBox", logo: "📦" },
  { name: "Gov.br", logo: "🇧🇷" },
  { name: "Azure", logo: "☁️" },
  { name: "AWS", logo: "🌐" },
  { name: "GCP", logo: "🏗️" }
];

export const VirtualMachinesSection = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Settings className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Máxima Flexibilidade</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Execução em <span className="text-primary">Máquinas Virtuais</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            RedData roda em qualquer infraestrutura virtualizada existente, 
            <strong className="text-foreground"> sem necessidade de mudanças técnicas ou aquisição de novos servidores</strong>.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Benefits */}
          <div>
            <Card className="p-8 bg-gradient-tech border-0">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Aproveite sua infraestrutura atual
                    </h3>
                    <p className="text-muted-foreground">
                      Não há necessidade de investir em novos servidores. 
                      Use os recursos já disponíveis no seu datacenter.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cloud className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Implementação rápida
                    </h3>
                    <p className="text-muted-foreground">
                      Deploy em minutos na sua plataforma de virtualização preferida, 
                      seja on-premises ou na nuvem.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Escalabilidade dinâmica
                    </h3>
                    <p className="text-muted-foreground">
                      Ajuste recursos conforme a demanda, garantindo performance 
                      otimizada para suas análises de dados.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="mt-8">
              <Button size="lg" onClick={scrollToForm}>
                Simular Implementação
              </Button>
            </div>
          </div>
          
          {/* Right - Compatible Platforms */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Compatível com:
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {vmProviders.map((provider, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center hover:shadow-medium transition-all duration-300 border-border/50 bg-card/30"
                >
                  <div className="text-2xl mb-2">{provider.logo}</div>
                  <h4 className="text-sm font-medium text-foreground">{provider.name}</h4>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <span className="text-sm text-muted-foreground">
                  E muitas outras plataformas de virtualização
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};