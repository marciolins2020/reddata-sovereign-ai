import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeartPulse, TrendingUp, FileCheck, Shield } from "lucide-react";

export const ModulesSection = () => {
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
    <section className="py-8 md:py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {t("modules.title")}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            {t("modules.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {modules.map((module) => (
            <div key={module.id} className="space-y-6 md:space-y-8">
              <Card 
                className={`group hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${module.gradient} border-2`}
              >
                <CardHeader className="pb-4 md:pb-6">
                  <Badge className="w-fit mb-3 md:mb-4 text-xs" variant="secondary">
                    {module.category}
                  </Badge>
                  <CardTitle className="text-xl md:text-2xl leading-tight">{module.title}</CardTitle>
                  <CardDescription className="text-sm md:text-base mt-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base text-foreground">
                      {t("modules.featuresTitle")}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <feature.icon className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-muted-foreground leading-tight">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-lg p-3 md:p-4">
                    <h4 className="font-semibold mb-2 text-sm md:text-base text-foreground">
                      {t("modules.resultsTitle")}
                    </h4>
                    <ul className="space-y-1">
                      {module.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-muted-foreground flex items-start gap-2 leading-tight">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full group-hover:scale-105 transition-transform text-sm md:text-base"
                    onClick={() => window.open(module.link, '_blank')}
                  >
                    {t("modules.learnMore")}
                  </Button>
                </CardContent>
              </Card>

              {/* Dashboard Preview - Abaixo do Card */}
              <div className="relative">
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-primary/30 via-blue-500/20 to-cyan-500/30 rounded-2xl blur-2xl opacity-75" />
                <div className="relative bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-xl rounded-xl border-2 border-primary/30 shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-2 md:p-3 border-b border-primary/20">
                    <h4 className="text-sm md:text-base font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      Dashboard ao Vivo
                    </h4>
                  </div>
                  <div className="p-2 md:p-4">
                    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-inner bg-muted/20">
                      <iframe
                        src={module.link}
                        className="w-full h-full border-0"
                        title={`${module.title} Dashboard Preview`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
