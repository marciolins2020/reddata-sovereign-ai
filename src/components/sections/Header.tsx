import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    { label: t('header.mainNav'), href: "#hero", id: "hero" },
    { label: t('header.howItWorks'), href: "#como-funciona", id: "como-funciona" },
    { label: t('header.solutions'), href: "#casos-uso", id: "casos-uso" },
    { label: "Dashboard", href: "#dashboard-demo", id: "dashboard-demo" },
    { label: t('header.faq'), href: "#faq", id: "faq" },
    { label: t('header.contact'), href: "#contact-form", id: "contato" },
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
      setShowScrollTop(window.scrollY > 400);

      // ScrollSpy - detectar seção ativa apenas na página principal
      if (location.pathname === "/") {
        const sections = ["hero", "como-funciona", "appliance", "arquitetura", "casos-uso", "comparativo", "contato"];
        
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
    scrollToElement(href);
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.slice(0, 4).map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative ${
                    isActiveLink(item.id)
                      ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-primary"
                      : "text-foreground hover:text-primary hover:bg-accent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Casos de Uso Dropdown */}
              <NavigationMenu className="z-[150]">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-auto px-4 py-2 text-sm font-medium">
                      {t('header.cases')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-[150]">
                      <ul className="grid w-[400px] gap-3 p-4 bg-background">
                        {casosUsoItems.map((item) => (
                          <li key={item.href}>
                            <Link to={item.href}>
                              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">{item.label}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              {/* Módulos Link */}
              <Link to="/modulos" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-accent inline-block">
                {t('header.modules')}
              </Link>
              
              <button
                onClick={() => scrollToSection(menuItems[4].href)}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative ${
                  isActiveLink(menuItems[4].id)
                    ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-primary"
                    : "text-foreground hover:text-primary hover:bg-accent"
                }`}
              >
                {menuItems[4].label}
              </button>
              <button
                onClick={() => scrollToSection(menuItems[5].href)}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative ${
                  isActiveLink(menuItems[5].id)
                    ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-primary"
                    : "text-foreground hover:text-primary hover:bg-accent"
                }`}
              >
                {menuItems[5].label}
              </button>
            </nav>

            {/* Language Switcher & CTA Button Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                className="flex items-center gap-2"
                aria-label="Switch language"
              >
                <span className="text-xl">{language === 'pt' ? '🇺🇸' : '🇧🇷'}</span>
              </Button>
              <Button onClick={() => scrollToSection("#contact-form")}>
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
              <nav className="flex flex-col space-y-2">
                {menuItems.slice(0, 4).map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-3 text-left text-sm font-medium transition-colors rounded-md ${
                      isActiveLink(item.id)
                        ? "text-primary bg-accent border-l-4 border-primary"
                        : "text-foreground hover:text-primary hover:bg-accent"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile Casos de Uso Submenu */}
                <div className="px-4 py-2">
                  <div className="text-sm font-medium text-muted-foreground mb-2">{t('header.cases')}</div>
                  {casosUsoItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-left text-sm text-foreground hover:text-primary hover:bg-accent transition-colors rounded-md"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                
                {/* Mobile Módulos Link */}
                <Link
                  to="/modulos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-left text-sm font-medium text-foreground hover:text-primary hover:bg-accent transition-colors rounded-md mx-4"
                >
                  {t('header.modules')}
                </Link>
                
                <button
                  onClick={() => scrollToSection(menuItems[4].href)}
                  className={`px-4 py-3 text-left text-sm font-medium transition-colors rounded-md ${
                    isActiveLink(menuItems[4].id)
                      ? "text-primary bg-accent border-l-4 border-primary"
                      : "text-foreground hover:text-primary hover:bg-accent"
                  }`}
                >
                  {menuItems[4].label}
                </button>
                <button
                  onClick={() => scrollToSection(menuItems[5].href)}
                  className={`px-4 py-3 text-left text-sm font-medium transition-colors rounded-md ${
                    isActiveLink(menuItems[5].id)
                      ? "text-primary bg-accent border-l-4 border-primary"
                      : "text-foreground hover:text-primary hover:bg-accent"
                  }`}
                >
                  {menuItems[5].label}
                </button>
                
                <div className="px-4 pt-2 space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">{language === 'pt' ? '🇺🇸' : '🇧🇷'}</span>
                    <span>{language === 'pt' ? 'English' : 'Português'}</span>
                  </Button>
                  <Button
                    onClick={() => scrollToSection("#contact-form")}
                    className="w-full"
                  >
                    {t('header.requestDemo')}
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

    {/* Botão Voltar ao Topo */}
    {showScrollTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-[90] p-3 bg-primary text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in"
        aria-label="Voltar ao topo"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    )}
    </>
  );
};
