import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Database, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/lib/scroll";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden pt-20">
      {/* Background decorative elements - moved lower to not overlap with logo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-8">
                <img 
                  src="/reddata-logo.png?v=2" 
                  alt="RedData® - Plataforma de Big Data e IA"
                  className="h-16 md:h-20 lg:h-24 w-auto"
                  width="597"
                  height="96"
                  loading="eager"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('hero.title')} <span className="text-primary">{t('hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-4">
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/auth'} 
                className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-primary hover:shadow-lg transition-all duration-300 group"
              >
                {t('hero.freeTrial')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => scrollToElement('contact-form')}
                className="bg-black/40 hover:bg-black/60 text-white border border-white/20 backdrop-blur-sm transition-all duration-300"
              >
                {t('hero.cta')}
              </Button>
            </div>
            
            <p className="text-center lg:text-left text-sm text-muted-foreground mb-12">
              {t('hero.noCreditCard')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{t('hero.feature4Title')}</div>
                  <div className="text-sm text-muted-foreground">{t('hero.feature4Desc')}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{t('hero.feature2Title')}</div>
                  <div className="text-sm text-muted-foreground">{t('hero.feature2Desc')}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{t('hero.feature3Title')}</div>
                  <div className="text-sm text-muted-foreground">{t('hero.feature3Desc')}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Real Dashboard Preview */}
          <div className="relative">
            <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-large hero-image-container">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full opacity-20 blur-xl"></div>
              <img 
                src="/reddata-dashboard-hero-optimized.webp"
                alt="RedData® Dashboard - Ministério Público do Amazonas"
                className="w-full h-auto object-cover"
                width="634"
                height="362"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">Dashboard em produção</span>
                    </div>
                    <span className="text-white/80 text-xs">MP-AM Produtividade</span>
                  </div>
                  <p className="text-white/90 text-xs mt-1">128 Promotores • 872.576 Processos • Analytics em tempo real</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};