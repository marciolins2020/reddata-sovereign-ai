import { Button } from "@/components/ui/button";
import { ArrowLeft, HeartPulse, TrendingUp, FileCheck, Shield, Scale, Brain, AlertTriangle, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dashboardManaus from "@/assets/dashboard-manaus.png";
import dashboardAudit from "@/assets/reddata-audit-dashboard.png";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

const Modulos = () => {
  const { t } = useLanguage();
  
  const modules = [
    {
      id: "teto-mac",
      category: t("modules.tetoMac.category"),
      title: t("modules.tetoMac.title"),
      description: t("modules.tetoMac.description"),
      features: [
        { icon: TrendingUp, text: t("modules.tetoMac.features.bigData") },
        { icon: FileCheck, text: t("modules.tetoMac.features.reports") },
        { icon: Shield, text: t("modules.tetoMac.features.sei") },
        { icon: HeartPulse, text: t("modules.tetoMac.features.consulting") },
      ],
      benefits: [
        t("modules.tetoMac.benefits.increase"),
        t("modules.tetoMac.benefits.approval"),
      ],
      link: "http://tetomac.redmaxx.com.br",
      gradient: "from-red-500/10 to-orange-500/10",
      dashboardImage: dashboardManaus,
      dashboardAlt: "Dashboard Prefeitura de Manaus",
      dashboardDescription: "Tela Principal do Projeto da Prefeitura de Manaus (AM).",
    },
    {
      id: "audit",
      category: t("modules.audit.category"),
      title: t("modules.audit.title"),
      description: t("modules.audit.description"),
      features: [
        { icon: Brain, text: t("modules.audit.features.ai") },
        { icon: Scale, text: t("modules.audit.features.jurisprudence") },
        { icon: AlertTriangle, text: t("modules.audit.features.risks") },
        { icon: Target, text: t("modules.audit.features.predictive") },
      ],
      benefits: [
        t("modules.audit.benefits.efficiency"),
        t("modules.audit.benefits.precision"),
      ],
      link: "https://auditoria.redmaxx.com.br",
      gradient: "from-blue-500/10 to-cyan-500/10",
      dashboardImage: dashboardAudit,
      dashboardAlt: "RedData.Audit Dashboard - IA Explicável",
      dashboardDescription: "Tela de IA Explicável (XAI) do RedData.Audit com análise detalhada de processos.",
    },
  ];
  
  return (
    <AuroraBackground className="min-h-screen">
      <div className="w-full">
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
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {t("modules.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("modules.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="-mt-8 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8">
            {modules.map((module) => (
              <div key={module.id}>
                <Card 
                  className={`group hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${module.gradient} border-2`}
                >
                  <CardHeader>
                    <Badge className="w-fit mb-4" variant="secondary">
                      {module.category}
                    </Badge>
                    <CardTitle className={`text-2xl ${module.id === 'audit' ? 'text-black dark:text-white' : ''}`}>
                      {module.title}
                    </CardTitle>
                    <CardDescription className={`text-base ${module.id === 'audit' ? 'text-black/80 dark:text-white/80' : ''}`}>
                      {module.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column - Features */}
                      <div>
                        <h4 className={`font-semibold mb-3 ${module.id === 'audit' ? 'text-black dark:text-white' : 'text-foreground'}`}>
                          {t("modules.featuresTitle")}
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {module.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                              <feature.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${module.id === 'audit' ? 'text-blue-600' : 'text-primary'}`} />
                              <span className={`text-sm ${module.id === 'audit' ? 'text-black/80 dark:text-white/80' : 'text-muted-foreground'}`}>
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Results */}
                      <div className="space-y-6">
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className={`font-semibold mb-3 ${module.id === 'audit' ? 'text-black dark:text-white' : 'text-foreground'}`}>
                            {t("modules.resultsTitle")}
                          </h4>
                          <ul className="space-y-2">
                            {module.benefits.map((benefit, idx) => (
                              <li key={idx} className={`text-sm flex items-start gap-2 ${module.id === 'audit' ? 'text-black/80 dark:text-white/80' : 'text-muted-foreground'}`}>
                                <span className={`text-lg ${module.id === 'audit' ? 'text-blue-600' : 'text-primary'}`}>✓</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button 
                          className={`w-full group-hover:scale-105 transition-transform ${module.id === 'audit' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                          onClick={() => window.open(module.link, '_blank')}
                        >
                          {t("modules.learnMore")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dashboard Preview - Abaixo do Card */}
                {module.dashboardImage && (
                  <div className="relative mt-8">
                    <div className={`absolute -inset-4 bg-gradient-to-br rounded-2xl blur-2xl opacity-75 ${
                      module.id === 'teto-mac' 
                        ? 'from-red-500/30 via-orange-500/20 to-red-500/30' 
                        : 'from-blue-500/30 via-cyan-500/20 to-blue-500/30'
                    }`} />
                    <div className="relative bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-xl rounded-xl border-2 border-primary/30 shadow-2xl overflow-hidden">
                      <div className={`bg-gradient-to-r p-3 border-b border-primary/20 ${
                        module.id === 'teto-mac'
                          ? 'from-red-500/10 to-orange-500/10'
                          : 'from-blue-500/10 to-cyan-500/10'
                      }`}>
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          Dashboard Preview
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="rounded-lg overflow-hidden shadow-inner">
                          <img 
                            src={module.dashboardImage} 
                            alt={module.dashboardAlt} 
                            className="w-full h-auto"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          {module.dashboardDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('modules.ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('modules.ctaSubtitle')}
          </p>
          <Link to="/#contact-form">
            <Button size="lg" className="gap-2">
              {t('modules.requestDemo')}
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </AuroraBackground>
  );
};

export default Modulos;
