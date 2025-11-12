import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { scrollToElement } from "@/lib/scroll";

export const EBookSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido para baixar o eBook.",
        variant: "destructive",
      });
      return;
    }

    // Trigger download
    const link = document.createElement("a");
    link.href = "/ebook-governo-impulsionado-por-dados.pdf";
    link.download = "Governo-Impulsionado-por-Dados-RedMaxx.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    toast({
      title: "Download iniciado!",
      description: "Seu eBook está sendo baixado. Obrigado pelo interesse!",
    });

    // Optional: Send email to backend for lead capture
    // supabase.from('leads').insert({ email, source: 'ebook' })
  };

  return (
    <section id="ebook" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-icon-bg border border-border">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Material Gratuito</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                Governo Impulsionado por Dados
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Transformando a Gestão Pública em Saúde, Educação, Fazenda e Segurança
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Conceitos fundamentais de Data Driven Government
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Aplicações práticas em setores críticos do governo
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Estudos de caso e melhores práticas
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Estratégias de implementação e ferramentas
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Download form */}
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                {!downloaded ? (
                  <form onSubmit={handleDownload} className="space-y-6">
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-20 h-20 bg-icon-bg rounded-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          Baixe o eBook Gratuito
                        </h3>
                        <p className="text-muted-foreground">
                          Insira seu email para receber o material completo
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 text-base"
                          required
                        />
                      </div>

                      <Button 
                        type="submit"
                        size="lg"
                        className="w-full h-12 text-base font-semibold"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Baixar eBook Agora
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Ao baixar, você concorda em receber comunicações da RedMaxx. 
                        Seus dados estão protegidos pela LGPD.
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div className="mx-auto w-20 h-20 bg-icon-bg rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        Download Iniciado!
                      </h3>
                      <p className="text-muted-foreground">
                        Obrigado pelo interesse. O eBook está sendo baixado.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = "/ebook-governo-impulsionado-por-dados.pdf";
                        link.download = "Governo-Impulsionado-por-Dados-RedMaxx.pdf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Novamente
                    </Button>
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-3xl rounded-full" />
            </div>
          </div>
          
          {/* CTA to Contact */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => scrollToElement('#contact-form')}
            >
              Solicitar Demonstração
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};