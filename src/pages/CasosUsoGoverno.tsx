import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, TrendingUp, Shield, BarChart3, Users, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import prefeituraDashboard from "@/assets/prefeitura-manaus-dashboard.png";
import adsLogo from "@/assets/ads-logo.png";
import semefLogo from "@/assets/semef-logo.png";
import adsDashboard from "@/assets/ads-dashboard.png";

const CasosUsoGoverno = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('casosUsoGoverno.backHome')}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{t('casosUsoGoverno.badge')}</h1>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('casosUsoGoverno.intro')}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-background border border-border">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoGoverno.benefit1Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoGoverno.benefit1Desc')}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoGoverno.benefit2Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoGoverno.benefit2Desc')}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoGoverno.benefit3Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoGoverno.benefit3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 1: ADS */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={adsLogo} 
                  alt="Logo ADS - Agência de Desenvolvimento Sustentável do Amazonas" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{t('casosUsoGoverno.caseAdsTitle')}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              {t('casosUsoGoverno.challengeText')}
            </p>

            <div className="mb-8 rounded-xl overflow-hidden border border-border shadow-lg">
              <img 
                src={adsDashboard} 
                alt="Dashboard do sistema RedData® para ADS mostrando subvenção de Piaçava com controles e mapas"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Results ADS */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 mb-16 border border-primary/20">
            <h3 className="text-2xl font-semibold mb-6">{t('casosUsoGoverno.resultsTitle')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoGoverno.result1')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoGoverno.result2')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoGoverno.result3')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoGoverno.result4')}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg border border-border mb-16">
            <p className="text-lg font-medium text-center">
              {t('casosUsoGoverno.conclusionAds')}
            </p>
          </div>

          {/* Case Study 2: Prefeitura de Manaus */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={semefLogo} 
                  alt="Logo SEMEF - Secretaria Municipal da Fazenda de Manaus" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{t('casosUsoGoverno.casePrefeituraTitle')}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              {t('casosUsoGoverno.challengeText2')}
            </p>
            
            <div className="mb-8 rounded-xl overflow-hidden border border-border shadow-lg">
              <img 
                src={prefeituraDashboard} 
                alt="Dashboard do sistema OUV IPTU/ITBI da Prefeitura de Manaus mostrando mapa interativo com dados de imóveis" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Results Prefeitura */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 mb-12 border border-primary/20">
            <h3 className="text-2xl font-semibold mb-6">{t('casosUsoGoverno.resultsTitle2')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoGoverno.result2_1')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoGoverno.result2_2')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoGoverno.result2_3')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoGoverno.result2_4')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('casosUsoGoverno.ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('casosUsoGoverno.ctaSubtitle')}
          </p>
          <Link to="/#contact-form">
            <Button size="lg" className="gap-2">
              {t('casosUsoGoverno.requestDemo')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CasosUsoGoverno;
