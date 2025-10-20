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

  // Menu reduzido a 5 itens-âncora principais
  const menuItems = [
    { label: t('header.mainNav'), href: "#hero", id: "hero" },
    { label: t('header.howItWorks'), href: "#como-funciona", id: "como-funciona" },
    { label: t('header.solutions'), href: "#casos-uso", id: "casos-uso" },
    { label: t('header.cases'), href: "#cases", id: "cases" },
    { label: t('header.resources'), href: "#recursos", id: "recursos" },
  ];

  const casosUsoItems = [
    { label: t('useCases.energy'), href: "/casos-uso/energia", description: t('useCases.energyDesc') },
    { label: t('useCases.industry'), href: "/casos-uso/industria", description: t('useCases.industryDesc') },
    { label: t('useCases.government'), href: "/casos-uso/governo", description: t('useCases.governmentDesc') },
    { label: t('useCases.retail'), href: "/casos-uso/varejo", description: t('useCases.retailDesc') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);

      // ScrollSpy - detectar seção ativa apenas na página principal
      if (location.pathname === "/") {
        const sections = ["hero", "como-funciona", "casos-uso", "cases", "recursos"];
        
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

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    
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

            {/* Desktop Menu - 5 itens principais */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isActiveLink(item.id)
                      ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-primary"
                      : "text-foreground hover:text-primary hover:bg-accent"
                  }`}
                  aria-current={isActiveLink(item.id) ? "page" : undefined}
                >
                  {item.label}
                </button>
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
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-3 text-left text-sm font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      isActiveLink(item.id)
                        ? "text-primary bg-accent border-l-4 border-primary"
                        : "text-foreground hover:text-primary hover:bg-accent"
                    }`}
                    aria-current={isActiveLink(item.id) ? "page" : undefined}
                  >
                    {item.label}
                  </button>
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
