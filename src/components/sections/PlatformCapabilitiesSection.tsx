import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Zap, BarChart3, Workflow, Bell, Shield } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const PlatformCapabilitiesSection = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      icon: Database,
      titleKey: "platformCapabilities.connectTitle",
      descKey: "platformCapabilities.connectDesc",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Shield,
      titleKey: "platformCapabilities.storeTitle",
      descKey: "platformCapabilities.storeDesc",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Zap,
      titleKey: "platformCapabilities.processTitle",
      descKey: "platformCapabilities.processDesc",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: BarChart3,
      titleKey: "platformCapabilities.analyzeTitle",
      descKey: "platformCapabilities.analyzeDesc",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Workflow,
      titleKey: "platformCapabilities.visualizeTitle",
      descKey: "platformCapabilities.visualizeDesc",
      gradient: "from-indigo-500/20 to-blue-500/20"
    },
    {
      icon: Bell,
      titleKey: "platformCapabilities.automateTitle",
      descKey: "platformCapabilities.automateDesc",
      gradient: "from-yellow-500/20 to-orange-500/20"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("platformCapabilities.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("platformCapabilities.subtitle")}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className={`h-full border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${capability.gradient}`}>
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 rounded-2xl bg-primary/10">
                          <Icon className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          {t(capability.titleKey)}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t(capability.descKey)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
