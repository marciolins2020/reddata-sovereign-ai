import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  HardDrive,
  Wifi,
  Lock,
  Zap,
  Shield
} from "lucide-react";
import reddataApplianceServer from "@/assets/reddata-appliance-server.png";

const highlights = [
  {
    icon: Wifi,
    title: "Operação offline",
    description: "Ideal para ambientes sensíveis"
  },
  {
    icon: HardDrive,
    title: "SSD criptografado + GPU dedicada",
    description: "Máxima performance e segurança"
  },
  {
    icon: Zap,
    title: "Plug & Play",
    description: "Atualizações seguras"
  },
  {
    icon: Lock,
    title: "Controle físico e digital total",
    description: "Seus dados, sua infraestrutura"
  }
];

const useCases = [
  "Saúde",
  "Educação", 
  "Segurança",
  "Fazenda",
  "Tribunais de Justiça",
  "Tribunais de Contas"
];

export const ApplianceSection = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
              <Shield className="h-4 w-4 text-primary-glow" />
              <span className="text-sm font-medium text-primary-glow">Máxima Segurança</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-primary">RedData Appliance</span>
              <br />
              O poder do RedData, 100% dentro do seu datacenter.
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Para ambientes que exigem máxima segurança e controle total dos dados, 
              o RedData Appliance oferece toda a potência da plataforma em hardware dedicado.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{highlight.title}</h4>
                    <p className="text-sm text-gray-400">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-8">
              <h4 className="font-semibold text-white mb-4">Ideal para:</h4>
              <div className="flex flex-wrap gap-2">
                {useCases.map((useCase, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToForm}
              className="border-primary-glow text-primary-glow hover:bg-primary-glow hover:text-white"
            >
              Consultar Modelos
            </Button>
          </div>
          
          {/* Right Content - Real Appliance Product */}
          <div className="relative">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-large">
              <div className="p-6">
                <img 
                  src={reddataApplianceServer}
                  alt="Plataforma RedData Big Data Analytics - RedData BD Appliance Server"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            
            {/* Technical Specifications - Below Image */}
            <div className="mt-6 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white font-medium">NVIDIA GPU</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white font-medium">SUSE Linux</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white font-medium">Big Data Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white font-medium">IA Integrada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};