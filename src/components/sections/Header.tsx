import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/lib/scroll";
import redmaxxLogo from "@/assets/redmaxx-logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Menu principal com navegação por âncoras
  const menuItems: Array<{
    label: string;
    href: string;
    id: string;
    isRoute?: boolean;
    submenu?: Array<{ label: string; href: string; isRoute?: boolean }>;
  }> = [
    { label: t('header.mainNav'), href: "#hero", id: "hero" },
    { label: "Plataforma", href: "#plataforma", id: "plataforma", submenu: [
      { label: "Capacidades", href: "#plataforma" },
      { label: "Conectores", href: "#conectores" },
      { label: "Como Funciona", href: "#como-funciona" },
      { label: "Appliance", href: "#appliance" },
      { label: "Arquitetura", href: "#arquitetura" },
    ]},
    { label: t('header.solutions'), href: "#solucoes", id: "solucoes", submenu: [
      { label: "Aplicações", href: "#casos-uso" },
      { label: "Módulos", href: "#modulos" },
      { label: "Dashboard Demo", href: "#dashboard-demo" },
      { label: "Automação e Alertas", href: "#alertas" },
    ]},
    { label: "Diferenciais", href: "#diferenciais", id: "diferenciais", submenu: [
      { label: "Técnico", href: "#diferenciais" },
      { label: "White Label", href: "#white-label" },
      { label: "Máquinas Virtuais", href: "#vms" },
    ]},
    { label: t('header.resources'), href: "#recursos", id: "recursos", submenu: [
      { label: "FAQ", href: "#recursos" },
      { label: "eBook", href: "#ebook" },
      { label: "Comparação", href: "#comparacao" },
      { label: "Casos de Sucesso", href: "#cases" },
    ]},
    { label: "Trajetória", href: "/timeline", id: "timeline", isRoute: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);

      // ScrollSpy - detectar seção ativa apenas na página principal
      if (location.pathname === "/") {
        const sections = ["hero", "plataforma", "solucoes", "diferenciais", "recursos"];
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (href: string, isRoute?: boolean) => {
    setIsMobileMenuOpen(false);
    
    // Se for uma rota (não uma âncora), navegue diretamente
    if (isRoute) {
      navigate(href);
      return;
    }
    
    if (location.pathname !== "/") {
      // Se não estiver na página inicial, navegar primeiro para lá
      navigate("/");
      // Aguardar um pouco para a página carregar e então fazer o scroll
      setTimeout(() => {
        scrollToElement(href);
      }, 100);
    } else {
      // Se já estiver na página inicial, apenas fazer o scroll
      scrollToElement(href);
    }
  };

  const isActiveLink = (sectionId: string) => {
    return activeSection === sectionId;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border"
            : "bg-background/80 backdrop-blur-lg"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={redmaxxLogo}
                alt="RedMaxx"
                className="h-8 md:h-10 w-auto cursor-pointer"
                onClick={() => scrollToSection("#hero")}
                width="80"
                height="32"
                loading="eager"
              />
            </div>

            {/* Desktop Menu - Navigation with dropdowns */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
              {menuItems.map((item) => (
                item.submenu ? (
                  <NavigationMenu key={item.href}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={`px-4 py-2 text-sm font-medium ${
                          isActiveLink(item.id) ? "text-primary" : "text-foreground"
                        }`}>
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[200px] gap-1 p-2">
                            {item.submenu.map((subitem) => (
                              <li key={subitem.href}>
                                <NavigationMenuLink asChild>
                                  <button
                                    onClick={() => scrollToSection(subitem.href, subitem.isRoute)}
                                    className="block w-full text-left select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium">{subitem.label}</div>
                                  </button>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href, item.isRoute)}
                    className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      isActiveLink(item.id)
                        ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-primary"
                        : "text-foreground hover:text-primary hover:bg-accent"
                    }`}
                    aria-current={isActiveLink(item.id) ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </nav>

            {/* Language Switcher & CTA Button Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                className="flex items-center gap-2"
                aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              >
                <span className="text-xl">{language === 'pt' ? '🇺🇸' : '🇧🇷'}</span>
              </Button>
              <Button 
                onClick={() => scrollToSection("#contact-form")}
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {t('header.requestDemo')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border bg-background/80 backdrop-blur-xl">
              <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
                {menuItems.map((item) => (
                  <div key={item.href}>
                    <button
                      onClick={() => scrollToSection(item.href, item.isRoute)}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        isActiveLink(item.id)
                          ? "text-primary bg-accent border-l-4 border-primary"
                          : "text-foreground hover:text-primary hover:bg-accent"
                      }`}
                      aria-current={isActiveLink(item.id) ? "page" : undefined}
                    >
                      {item.label}
                    </button>
                    {item.submenu && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subitem) => (
                          <button
                            key={subitem.href}
                            onClick={() => scrollToSection(subitem.href)}
                            className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                          >
                            {subitem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="px-4 pt-2 space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                    className="w-full flex items-center justify-center gap-2"
                    aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                  >
                    <span className="text-xl">{language === 'pt' ? '🇺🇸' : '🇧🇷'}</span>
                    <span>{language === 'pt' ? 'English' : 'Português'}</span>
                  </Button>
                  <Button
                    onClick={() => scrollToSection("#contact-form")}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    {t('header.requestDemo')}
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
