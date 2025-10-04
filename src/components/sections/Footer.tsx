import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import reddataLogo from "@/assets/reddata-logo.png";
import redmaxxLogo from "@/assets/redmaxx-logo.png";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gradient-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Logo and Company Info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={redmaxxLogo} 
                alt="RedMaxx - Maxximizando Resultados" 
                className="h-12 w-auto"
                width="160"
                height="48"
                loading="lazy"
              />
            </div>
            
            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>{t('footer.experience')}</li>
              <li>{t('footer.nationalTech')}</li>
              <li>{t('footer.certified')}</li>
              <li>{t('footer.methodology')}</li>
            </ul>
            
            <div className="mb-4">
              <img 
                src={reddataLogo} 
                alt="RedData®"
                className="h-8 w-auto mb-3"
                width="200"
                height="32"
                loading="lazy"
              />
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              RedData® – A Plataforma Brasileira de Big Data & Inteligência Artificial para a transformação digital de organizações públicas e privadas.
            </p>
          </div>
          
          {/* Addresses - Grid 2x2 */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white mb-4">{t('footer.addresses')}</h3>
            
            {/* Grid 2x2 for addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-gray-300 text-sm">
                <p className="font-medium text-white mb-1">{t('footer.joinville')} ({t('footer.headquarters')}) 🇧🇷</p>
                <p>R. Dona Francisca, 801 - Andar 1</p>
                <p>Sala 05 e 06 - Saguaçu</p>
                <p>89221-006 - Joinville - SC</p>
                <p>(11) 94076-4626</p>
              </div>
              
              <div className="text-gray-300 text-sm">
                <p className="font-medium text-white mb-1">{t('footer.manaus')} ({t('footer.branch')}) 🇧🇷</p>
                <p>R. Rio Purús, 458, Cj.Vieiralves</p>
                <p>Nossa Sra. das Graças</p>
                <p>69053-050 - Manaus/AM</p>
                <p>(92) 98223-6695</p>
              </div>
              
              <div className="text-gray-300 text-sm">
                <p className="font-medium text-white mb-1">{t('footer.saoPaulo')} ({t('footer.branch')}) 🇧🇷</p>
                <p>Av. Eng. Luiz Carlos Berrini, 1140</p>
                <p>7° Andar - Sala 201/202</p>
                <p>04571-000 - São Paulo - SP</p>
                <p>(11) 2391-0597</p>
              </div>
              
              <div className="text-gray-300 text-sm">
                <p className="font-medium text-white mb-1">{t('footer.orlando')} ({t('footer.internationalOffice')}) 🇺🇸</p>
                <p>7620 Sutherton Lane</p>
                <p>Orlando - FL 34786 - USA</p>
                <p>+1 (407) 714-6552</p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="text-gray-300 text-sm space-y-1 pt-4 border-t border-gray-600">
              <p>E-mail: contato@redmaxx.com.br</p>
              <p>Site: <a href="http://www.redmaxx.com.br" target="_blank" rel="noopener noreferrer" className="text-primary-glow hover:text-white transition-colors">www.redmaxx.com.br</a></p>
              <p>Instagram: <a href="https://www.instagram.com/redmaxxbr" target="_blank" rel="noopener noreferrer" className="text-primary-glow hover:text-white transition-colors">@redmaxxbr</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/company/redmaxx/" target="_blank" rel="noopener noreferrer" className="text-primary-glow hover:text-white transition-colors">redmaxx</a></p>
              <p>{t('footer.weekSchedule')}</p>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.lgpd')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.copyright')}</a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-xs text-primary-glow font-bold">ISO</span>
              </div>
              <span className="text-xs text-gray-400">ISO 27001</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                🇧🇷
              </div>
              <span className="text-xs text-gray-400">{t('footer.nationalTechBadge')}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            © 2025 RedMaxx. {t('footer.rights')}
            <span className="block mt-2 text-muted-foreground">
              Transforme dados em estratégia com segurança, soberania e previsibilidade.
            </span>
            <span className="block mt-1 text-xs text-muted-foreground">
              100+ Implementações | Empresas Privadas e Órgãos Públicos
            </span>
            <span className="block mt-1">{t('footer.poweredBy')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};