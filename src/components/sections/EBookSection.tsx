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
        title: t('ebook.invalidEmail'),
        description: t('ebook.invalidEmailDesc'),
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
      title: t('ebook.downloadStarted'),
      description: t('ebook.downloadStartedDesc'),
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t('ebook.freeMaterial')}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                {t('ebook.title')}
              </h2>
              
              <p className="text-xl text-muted-foreground">
                {t('ebook.subtitle')}
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    {t('ebook.feature1')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    {t('ebook.feature2')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    {t('ebook.feature3')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    {t('ebook.feature4')}
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
                      <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {t('ebook.downloadTitle')}
                        </h3>
                        <p className="text-muted-foreground">
                          {t('ebook.downloadSubtitle')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder={t('ebook.emailPlaceholder')}
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
                        {t('ebook.downloadButton')}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        {t('ebook.privacyNote')}
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {t('ebook.successTitle')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('ebook.successMessage')}
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
                      {t('ebook.downloadAgain')}
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
              {t('header.requestDemo')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};