import { Link } from "react-router-dom";
import redmaxxLogo from "@/assets/redmaxx-logo.png";
import reddataLogo from "@/assets/reddata-logo.png";

export function AuditFooter() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img 
              src={reddataLogo} 
              alt="RedData®" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground mb-4">
              Plataforma brasileira de Big Data e Inteligência Artificial para auditoria pública.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Um produto da</span>
              <img 
                src={redmaxxLogo} 
                alt="RedMaxx" 
                className="h-6 w-auto"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#o-que-e" className="hover:text-[#E30613] transition-colors">
                  O que é RedData.Audit
                </a>
              </li>
              <li>
                <a href="#modulos" className="hover:text-[#E30613] transition-colors">
                  Módulos
                </a>
              </li>
              <li>
                <Link to="/audit" className="hover:text-[#E30613] transition-colors">
                  Dashboard Interativo
                </Link>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#E30613] transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-[#E30613] transition-colors">
                  RedData Plataforma
                </Link>
              </li>
              <li>
                <Link to="/modulos" className="hover:text-[#E30613] transition-colors">
                  Outros Módulos
                </Link>
              </li>
              <li>
                <a href="http://tetomac.redmaxx.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-[#E30613] transition-colors">
                  Teto MAC
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} RedMaxx. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <span>RedData®</span>
              <span>•</span>
              <span>100% Nacional</span>
              <span>•</span>
              <span>LGPD Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
