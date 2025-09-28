import { Separator } from "@/components/ui/separator";
import reddataLogo from "@/assets/reddata-logo.png";
import redmaxxLogo from "@/assets/redmaxx-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={reddataLogo} 
                alt="RedData" 
                className="h-8"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A plataforma brasileira de Big Data e IA que transforma dados em estratégia 
              com segurança, soberania e previsibilidade.
            </p>
            <div className="flex items-center mb-6">
              <img 
                src={redmaxxLogo} 
                alt="RedMaxx - Maxximizando Resultados" 
                className="h-12 md:h-16"
              />
            </div>
          </div>
          
          {/* Company Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">RedMaxx</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>15+ anos de experiência</li>
              <li>100% tecnologia nacional</li>
              <li>ISO 27001 certificada</li>
              <li>Metodologia Data Driven Government</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>contato@redmaxx.com.br</li>
              <li>+55 (11) 3000-0000</li>
              <li>LinkedIn</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-gray-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">LGPD</a>
            <a href="#" className="hover:text-white transition-colors">Direitos Autorais</a>
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
              <span className="text-xs text-gray-400">Tecnologia Nacional</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            © 2024 RedMaxx. Todos os direitos reservados. 
            <span className="block mt-1">Powered by RedMaxx - Maxximizando Resultados</span>
          </p>
        </div>
      </div>
    </footer>
  );
};