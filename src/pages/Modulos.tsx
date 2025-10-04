import { Button } from "@/components/ui/button";
import { ArrowLeft, HeartPulse, TrendingUp, FileCheck, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dashboardManaus from "@/assets/dashboard-manaus.png";

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
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
  ];
  
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
                    <CardTitle className="text-2xl">{module.title}</CardTitle>
                    <CardDescription className="text-base">
                      {module.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column - Features */}
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">
                          {t("modules.featuresTitle")}
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {module.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                              <feature.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Results */}
                      <div className="space-y-6">
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold mb-3 text-foreground">
                            {t("modules.resultsTitle")}
                          </h4>
                          <ul className="space-y-2">
                            {module.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary text-lg">✓</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button 
                          className="w-full group-hover:scale-105 transition-transform"
                          onClick={() => window.open(module.link, '_blank')}
                        >
                          {t("modules.learnMore")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dashboard Preview - Abaixo do Card */}
                <div className="relative mt-8">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-blue-500/20 to-cyan-500/30 rounded-2xl blur-2xl opacity-75" />
                  <div className="relative bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-xl rounded-xl border-2 border-primary/30 shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-3 border-b border-primary/20">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        Dashboard ao Vivo
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="aspect-video w-full rounded-lg overflow-hidden shadow-inner bg-muted/20">
                        <iframe
                          src={module.link}
                          className="w-full h-full border-0"
                          title={`${module.title} Dashboard Preview`}
                          loading="lazy"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Tela Principal do Projeto da Prefeitura de Manaus (AM).
                      </p>
                    </div>
                  </div>
                </div>
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
  );
};

export default Modulos;
