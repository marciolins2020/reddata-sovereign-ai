import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import redmaxxLogo from "@/assets/redmaxx-logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const menuItems = [
  { label: "Início", href: "#hero" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Aplicações Reais", href: "#casos-uso" },
  { label: "Dashboard", href: "#dashboard-demo" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contact-form" },
];

const casosUsoItems = [
  { label: "Energia", href: "/casos-uso/energia", description: "Transformação digital em operações energéticas" },
  { label: "Indústria", href: "/casos-uso/industria", description: "Evolução para Indústria 4.0 com Big Data e IA" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={redmaxxLogo}
              alt="RedMaxx"
              className="h-8 md:h-10 cursor-pointer"
              onClick={() => scrollToSection("#hero")}
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.slice(0, 4).map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
              >
                {item.label}
              </button>
            ))}
            
            {/* Casos de Uso Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-auto px-4 py-2 text-sm font-medium">
                    Casos de Uso
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
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
            
            {menuItems.slice(4).map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden lg:block">
            <Button onClick={() => scrollToSection("#contact-form")}>
              Solicitar Demonstração
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
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-3 text-left text-sm font-medium text-foreground hover:text-primary hover:bg-accent transition-colors rounded-md"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Casos de Uso Submenu */}
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">Casos de Uso</div>
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
              
              <div className="px-4 pt-2">
                <Button
                  onClick={() => scrollToSection("#contact-form")}
                  className="w-full"
                >
                  Solicitar Demonstração
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
