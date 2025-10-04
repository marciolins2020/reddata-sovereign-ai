import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Lock, Flag, Gauge } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";

export const WhiteLabelSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Server,
      titleKey: "whiteLabel.applianceTitle",
      descKey: "whiteLabel.applianceDesc"
    },
    {
      icon: Lock,
      titleKey: "whiteLabel.sovereignTitle",
      descKey: "whiteLabel.sovereignDesc"
    },
    {
      icon: Flag,
      titleKey: "whiteLabel.brandedTitle",
      descKey: "whiteLabel.brandedDesc"
    },
    {
      icon: Gauge,
      titleKey: "whiteLabel.performanceTitle",
      descKey: "whiteLabel.performanceDesc"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <Badge className="mb-4 text-sm md:text-lg px-4 md:px-6 py-1.5 md:py-2 bg-gradient-to-r from-primary to-primary/60">
            {t("whiteLabel.badge")}
          </Badge>
          <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold px-2">
            {t("whiteLabel.title")}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground/70 mb-3 md:mb-4">
            {t("whiteLabel.titleSuffix")}
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            {t("whiteLabel.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300 md:hover:scale-105">
                <CardContent className="p-4 md:p-8">
                  <div className="flex items-start gap-3 md:gap-6">
                    <div className="p-2 md:p-4 rounded-xl md:rounded-2xl bg-primary/10 shrink-0">
                      <Icon className="w-6 h-6 md:w-10 md:h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {t(feature.descKey)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-pink-100/80 rounded-xl md:rounded-2xl p-6 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-foreground px-2">
            {t("whiteLabel.ctaTitle")}
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground/80 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            {t("whiteLabel.ctaDesc")}
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white text-sm md:text-base lg:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
            onClick={() => scrollToElement("#contato")}
          >
            {t("whiteLabel.ctaButton")}
          </Button>
        </div>
      </div>
    </section>
  );
};
