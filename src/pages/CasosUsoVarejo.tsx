import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, TrendingUp, MapPin, BarChart3, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import amancoLogo from "@/assets/amanco-logo.png";
import amancoDashboard from "@/assets/amanco-dashboard.png";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

const CasosUsoVarejo = () => {
  const { t } = useLanguage();
  
  return (
    <AuroraBackground className="min-h-screen">
      <div className="w-full">
      {/* Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('casosUsoVarejo.backHome')}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{t('casosUsoVarejo.badge')}</h1>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('casosUsoVarejo.intro')}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-background border border-border">
              <Target className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoVarejo.benefit1Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoVarejo.benefit1Desc')}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoVarejo.benefit2Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoVarejo.benefit2Desc')}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <Sparkles className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('casosUsoVarejo.benefit3Title')}</h3>
              <p className="text-muted-foreground">
                {t('casosUsoVarejo.benefit3Desc')}
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
              <img src={amancoLogo} alt="Amanco Wavin Logo" className="h-16 w-auto" />
              <h2 className="text-3xl md:text-4xl font-bold">{t('casosUsoVarejo.caseTitle')}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              {t('casosUsoVarejo.challengeText')}
            </p>
          </div>

          {/* Dashboard Image */}
          <div className="mb-12 rounded-xl overflow-hidden border border-border shadow-lg">
            <img 
              src={amancoDashboard} 
              alt="Dashboard Amanco - Análise de Lojas" 
              className="w-full h-auto"
            />
          </div>

          {/* Challenge Details */}
          <div className="bg-muted/50 rounded-xl p-8 mb-12 border border-border">
            <h3 className="text-2xl font-semibold mb-6">{t('casosUsoVarejo.challengeTitle')}</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.challenge1')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.challenge2')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.challenge3')}
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">{t('casosUsoVarejo.solutionTitle')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('casosUsoVarejo.solutionIntro')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.solution1')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.solution2')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.solution3')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.solution4')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.solution5')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.solution6')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.solution7')}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 mb-12 border border-primary/20">
            <h3 className="text-2xl font-semibold mb-6">{t('casosUsoVarejo.resultsTitle')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.result1')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.result2')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.result3')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.result4')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.result5')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.result6')}
                </p>
              </div>
            </div>
          </div>

          {/* Differentials */}
          <div className="bg-muted/50 rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-6">{t('casosUsoVarejo.differentialsTitle')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.differential1')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.differential2')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.differential3')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <p className="text-foreground">
                  {t('casosUsoVarejo.differential4')}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Link to="/#contact">
              <Button size="lg" className="gap-2">
                {t('casosUsoVarejo.ctaButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </AuroraBackground>
  );
};

export default CasosUsoVarejo;
