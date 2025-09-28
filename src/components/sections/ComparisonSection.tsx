import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "100% Proprietário",
    reddata: true,
    traditional: false,
    saas: false
  },
  {
    feature: "IA Generativa Local",
    reddata: true,
    traditional: false,
    saas: false
  },
  {
    feature: "Funciona Offline / Appliance",
    reddata: true,
    traditional: false,
    saas: false
  },
  {
    feature: "Soberania Digital",
    reddata: true,
    traditional: false,
    saas: false
  },
  {
    feature: "Conectividade Total",
    reddata: true,
    traditional: "partial",
    saas: "partial"
  },
  {
    feature: "Licença SaaS Ilimitada",
    reddata: true,
    traditional: false,
    saas: "partial"
  }
];

export const ComparisonSection = () => {
  return (
    <section className="py-24 bg-gradient-tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que escolher <span className="text-primary">RedData</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Compare e veja as vantagens de uma solução verdadeiramente nacional
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-foreground font-semibold">Características</th>
                    <th className="text-center py-3 text-primary font-semibold">RedData</th>
                    <th className="text-center py-3 text-muted-foreground font-semibold">BI Tradicional</th>
                    <th className="text-center py-3 text-muted-foreground font-semibold">SaaS Genérico</th>
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
                          <span className="text-sm text-muted-foreground">Parcial</span>
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {row.saas === "partial" ? (
                          <span className="text-sm text-muted-foreground">Parcial</span>
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
              <span className="text-sm font-medium text-primary">Única solução 100% brasileira com IA offline</span>
            </div>
            
            {/* Seção de Licenciamento SaaS */}
            <div className="mt-8 max-w-2xl mx-auto">
              <Card className="p-6 bg-gradient-primary border-0 text-white">
                <h3 className="text-xl font-bold mb-3">Modelo de Licenciamento SaaS Revolucionário</h3>
                <p className="text-white/90 mb-4">
                  RedData oferece um modelo de licenciamento SaaS único com <strong>usuários ilimitados</strong> e <strong>cores de servidor ilimitados</strong>, tudo em um <strong>preço fixo anual</strong>.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Usuários Ilimitados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Cores Ilimitados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Preço Fixo Anual</span>
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