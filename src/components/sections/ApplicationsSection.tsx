import { Card } from "@/components/ui/card";
import { 
  Building,
  Heart,
  GraduationCap,
  DollarSign
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/lib/scroll";
import { Button } from "@/components/ui/button";

export const ApplicationsSection = () => {
  const { t } = useLanguage();

  const applications = [
    {
      icon: Building,
      sector: t('applications.government'),
      title: t('applications.governmentTitle'),
      description: t('applications.governmentDesc'),
      benefits: [
        t('applications.governmentBenefit1'),
        t('applications.governmentBenefit2'),
        t('applications.governmentBenefit3')
      ]
    },
    {
      icon: Heart,
      sector: t('applications.health'),
      title: t('applications.healthTitle'),
      description: t('applications.healthDesc'),
      benefits: [
        t('applications.healthBenefit1'),
        t('applications.healthBenefit2'),
        t('applications.healthBenefit3')
      ]
    },
    {
      icon: GraduationCap,
      sector: t('applications.education'),
      title: t('applications.educationTitle'),
      description: t('applications.educationDesc'),
      benefits: [
        t('applications.educationBenefit1'),
        t('applications.educationBenefit2'),
        t('applications.educationBenefit3')
      ]
    },
    {
      icon: DollarSign,
      sector: t('applications.finance'),
      title: t('applications.financeTitle'),
      description: t('applications.financeDesc'),
      benefits: [
        t('applications.financeBenefit1'),
        t('applications.financeBenefit2'),
        t('applications.financeBenefit3')
      ]
    }
  ];

  return (
    <section id="casos-uso" className="py-12 bg-gradient-tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">{t('applications.title')}</span> {t('applications.subtitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {t('applications.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((app, index) => (
            <Card key={index} className="p-8 border-0 bg-card/50 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <app.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-primary mb-1">{app.sector}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{app.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{app.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">{t('applications.mainBenefits')}</h4>
                <ul className="space-y-2">
                  {app.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full mb-8">
            <span className="text-primary font-semibold">{t('applications.experienceBadge')}</span>
            <span className="text-muted-foreground">{t('applications.experienceText')}</span>
          </div>
          
          <Button 
            size="lg"
            onClick={() => scrollToElement('#contact-form')}
            className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-primary hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {t('hero.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};