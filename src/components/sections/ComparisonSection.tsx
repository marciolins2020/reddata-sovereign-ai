import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ComparisonSection = () => {
  const { t } = useLanguage();

  const comparisonData = [
    {
      feature: t('comparison.feature1'),
      reddata: true,
      traditional: false,
      saas: false
    },
    {
      feature: t('comparison.feature2'),
      reddata: true,
      traditional: false,
      saas: false
    },
    {
      feature: t('comparison.feature3'),
      reddata: true,
      traditional: false,
      saas: false
    },
    {
      feature: t('comparison.feature4'),
      reddata: true,
      traditional: false,
      saas: false
    },
    {
      feature: t('comparison.feature5'),
      reddata: true,
      traditional: "partial",
      saas: "partial"
    },
    {
      feature: t('comparison.feature6'),
      reddata: true,
      traditional: false,
      saas: "partial"
    }
  ];

  return (
    <section className="py-24 bg-gradient-tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('comparison.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('comparison.subtitle')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-foreground font-semibold">{t('comparison.characteristics')}</th>
                    <th className="text-center py-3 text-primary font-semibold">{t('comparison.reddata')}</th>
                    <th className="text-center py-3 text-muted-foreground font-semibold">{t('comparison.traditional')}</th>
                    <th className="text-center py-3 text-muted-foreground font-semibold">{t('comparison.saas')}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 text-foreground">{row.feature}</td>
                      <td className="py-4 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="py-4 text-center">
                        {row.traditional === "partial" ? (
                          <span className="text-sm text-muted-foreground">{t('comparison.partial')}</span>
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {row.saas === "partial" ? (
                          <span className="text-sm text-muted-foreground">{t('comparison.partial')}</span>
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t('comparison.uniqueSolution')}</span>
            </div>
            
            {/* Seção de Licenciamento SaaS */}
            <div className="mt-8 max-w-2xl mx-auto">
              <Card className="p-6 bg-gradient-primary border-0 text-white">
                <h3 className="text-xl font-bold mb-3">{t('comparison.licensingTitle')}</h3>
                <p className="text-white/90 mb-4">
                  {t('comparison.licensingDesc')}
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>{t('comparison.unlimitedUsers')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>{t('comparison.unlimitedCores')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>{t('comparison.fixedPrice')}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};