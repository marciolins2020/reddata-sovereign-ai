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
    <section className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-lg px-6 py-2 bg-gradient-to-r from-primary to-primary/60">
            {t("whiteLabel.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("whiteLabel.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("whiteLabel.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-primary/10 shrink-0">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(feature.descKey)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            {t("whiteLabel.ctaTitle")}
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("whiteLabel.ctaDesc")}
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8"
            onClick={() => scrollToElement("#contato")}
          >
            {t("whiteLabel.ctaButton")}
          </Button>
        </div>
      </div>
    </section>
  );
};
