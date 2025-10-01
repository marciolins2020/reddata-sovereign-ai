import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, TrendingUp, Shield, BarChart3, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import enelDashboard from "@/assets/enel-dashboard.jpeg";
import enelLogo from "@/assets/enel-logo.png";

const CasosUsoEnergia = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('casosUsoEnergia.backHome')}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{t('casosUsoEnergia.badge')}</h1>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('casosUsoEnergia.intro')}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-background border border-border">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoEnergia.benefit1Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoEnergia.benefit1Desc')}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoEnergia.benefit2Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoEnergia.benefit2Desc')}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoEnergia.benefit3Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoEnergia.benefit3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={enelLogo} 
                  alt="Logo Enel" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{t('casosUsoEnergia.caseTitle')}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              {t('casosUsoEnergia.challengeText')}
            </p>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 mb-12 border border-primary/20">
            <h3 className="text-2xl font-semibold mb-6">{t('casosUsoEnergia.resultsTitle')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoEnergia.result1')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoEnergia.result2')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoEnergia.result3')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoEnergia.result4')}
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Image */}
          <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
            <img 
              src={enelDashboard} 
              alt="Dashboard RedData - Predição de Anomalias em Religadoras Automáticas - Projeto Enel"
              className="w-full h-auto"
            />
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
            <p className="text-lg font-medium text-center">
              {t('casosUsoEnergia.conclusionEnel')}
            </p>
          </div>

          {/* Scientific Article Section */}
          <div className="mt-8 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{t('casosUsoEnergia.scientificArticle')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('casosUsoEnergia.articleDesc')}
                </p>
                <a 
                  href="/enel-scientific-article.pdf" 
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {t('casosUsoEnergia.downloadArticle')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('casosUsoEnergia.ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('casosUsoEnergia.ctaSubtitle')}
          </p>
          <Link to="/#contact-form">
            <Button size="lg" className="gap-2">
              {t('casosUsoEnergia.requestDemo')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CasosUsoEnergia;
