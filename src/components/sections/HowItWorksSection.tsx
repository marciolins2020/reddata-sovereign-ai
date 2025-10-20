import { Card } from "@/components/ui/card";
import { 
  Server,
  Globe,
  Brain,
  BarChart3,
  Bot,
  Shield
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/lib/scroll";
import { Button } from "@/components/ui/button";
import reddataDemo from "@/assets/reddata-demo.mp4";

export const HowItWorksSection = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Server,
      title: t('howItWorks.pillar1Title'),
      description: t('howItWorks.pillar1Desc')
    },
    {
      icon: Globe,
      title: t('howItWorks.pillar2Title'),
      description: t('howItWorks.pillar2Desc')
    },
    {
      icon: Brain,
      title: t('howItWorks.pillar3Title'),
      description: t('howItWorks.pillar3Desc')
    },
    {
      icon: BarChart3,
      title: t('howItWorks.pillar4Title'),
      description: t('howItWorks.pillar4Desc')
    },
    {
      icon: Bot,
      title: t('howItWorks.pillar5Title'),
      description: t('howItWorks.pillar5Desc')
    },
    {
      icon: Shield,
      title: t('howItWorks.pillar6Title'),
      description: t('howItWorks.pillar6Desc')
    }
  ];
  
  return (
    <section id="como-funciona" className="py-12 bg-gradient-tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary">{t('howItWorks.integrated')}</span>
          </div>
          
          <Button 
            size="lg"
            onClick={() => scrollToElement('#contact-form')}
            className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-primary hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {t('hero.cta')}
          </Button>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center text-foreground mb-6">
            {t('howItWorks.kddTitle')}
          </h3>
          <div className="rounded-xl overflow-hidden border border-border shadow-lg bg-card/50 backdrop-blur-sm">
            <video 
              src={reddataDemo} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto"
              style={{ filter: 'brightness(1.04) contrast(1.02)' }}
              aria-label="Demonstração de como o RedData® funciona"
            />
          </div>
        </div>
      </div>
    </section>
  );
};