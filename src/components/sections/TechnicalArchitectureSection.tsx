import { Database, Brain, Shield, Zap, Plug, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

const TechnicalArchitectureSection = () => {
  const { t } = useLanguage();

  const components = [
    {
      icon: Database,
      titleKey: "technicalArchitecture.dataArchitecture.title",
      itemsKey: "technicalArchitecture.dataArchitecture.items",
    },
    {
      icon: Brain,
      titleKey: "technicalArchitecture.aiMl.title",
      itemsKey: "technicalArchitecture.aiMl.items",
    },
    {
      icon: Shield,
      titleKey: "technicalArchitecture.governance.title",
      itemsKey: "technicalArchitecture.governance.items",
    },
    {
      icon: Zap,
      titleKey: "technicalArchitecture.scalability.title",
      itemsKey: "technicalArchitecture.scalability.items",
    },
    {
      icon: Plug,
      titleKey: "technicalArchitecture.integration.title",
      itemsKey: "technicalArchitecture.integration.items",
    },
    {
      icon: Activity,
      titleKey: "technicalArchitecture.continuousOps.title",
      itemsKey: "technicalArchitecture.continuousOps.items",
    },
  ];

  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("technicalArchitecture.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("technicalArchitecture.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {components.map((component, index) => {
            const Icon = component.icon;
            const items = t(component.itemsKey) as unknown as string[];
            
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-semibold">
                      {t(component.titleKey)}
                    </h3>
                    
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {Array.isArray(items) && items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalArchitectureSection;
