import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Zap, TrendingUp, Shield, Clock, Target } from "lucide-react";

export const AutomationAlertsSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Bell,
      titleKey: "automationAlerts.intelligentAlertsTitle",
      descKey: "automationAlerts.intelligentAlertsDesc",
      items: [
        "automationAlerts.alertItem1",
        "automationAlerts.alertItem2",
        "automationAlerts.alertItem3"
      ]
    },
    {
      icon: Zap,
      titleKey: "automationAlerts.automationTitle",
      descKey: "automationAlerts.automationDesc",
      items: [
        "automationAlerts.autoItem1",
        "automationAlerts.autoItem2",
        "automationAlerts.autoItem3"
      ]
    },
    {
      icon: TrendingUp,
      titleKey: "automationAlerts.predictiveTitle",
      descKey: "automationAlerts.predictiveDesc",
      items: [
        "automationAlerts.predItem1",
        "automationAlerts.predItem2",
        "automationAlerts.predItem3"
      ]
    }
  ];

  const benefits = [
    { icon: Clock, textKey: "automationAlerts.benefit1" },
    { icon: Target, textKey: "automationAlerts.benefit2" },
    { icon: Shield, textKey: "automationAlerts.benefit3" }
  ];

  return (
    <section id="alertas" className="py-10 px-4 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-lg px-6 py-2" variant="secondary">
            {t("automationAlerts.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("automationAlerts.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("automationAlerts.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{t(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{t(feature.descKey)}</p>
                  <ul className="space-y-2">
                    {feature.items.map((itemKey, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm">{t(itemKey)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex items-center gap-4 p-6 rounded-xl bg-primary/5 border-2 border-primary/10">
                <Icon className="w-8 h-8 text-primary shrink-0" />
                <p className="font-semibold">{t(benefit.textKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
