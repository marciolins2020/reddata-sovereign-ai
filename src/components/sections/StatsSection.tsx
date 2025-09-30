import { CheckCircle2, Building, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const StatsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Main Highlight */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              {t('stats.highlight')}
            </h2>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <div className="font-semibold text-lg">100+</div>
                <div className="text-sm text-muted-foreground">{t('stats.implementations')}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <div className="font-semibold text-lg">15+</div>
                <div className="text-sm text-muted-foreground">{t('stats.yearsExperience')}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <div className="font-semibold text-lg">ISO</div>
                <div className="text-sm text-muted-foreground">27001 {t('stats.certified')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};