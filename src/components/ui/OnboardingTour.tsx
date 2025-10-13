import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  target: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
}

const TOUR_STEPS: TourStep[] = [
  {
    target: "#hero",
    title: "Comece por aqui",
    description: "Conheça o RedData - a plataforma de Business Intelligence desenvolvida na Amazônia que transforma dados em resultados.",
    position: "bottom",
  },
  {
    target: "#como-funciona",
    title: "Explore os módulos",
    description: "Descubra os seis pilares da RedData: conectores de dados, dashboards inteligentes, IA/ML, alertas automáticos e muito mais.",
    position: "bottom",
  },
  {
    target: "#contato",
    title: "Solicite sua demonstração",
    description: "Pronto para transformar dados em resultados? 🚀 Clique aqui para conversar com nossa equipe RedData.",
    position: "top",
  },
];

export const OnboardingTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    // Verificar se o tour já foi exibido
    const tourCompleted = localStorage.getItem("reddata-tour-completed");
    
    if (!tourCompleted) {
      // Aguardar 1 segundo antes de mostrar o tour
      const timer = setTimeout(() => {
        setIsVisible(true);
        updateTargetPosition();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      updateTargetPosition();
      window.addEventListener("resize", updateTargetPosition);
      return () => window.removeEventListener("resize", updateTargetPosition);
    }
  }, [currentStep, isVisible]);

  const updateTargetPosition = () => {
    const target = document.querySelector(TOUR_STEPS[currentStep].target);
    if (target) {
      setTargetRect(target.getBoundingClientRect());
      
      // Scroll suave até o elemento
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handleSkip = () => {
    completeTour();
  };

  const completeTour = () => {
    localStorage.setItem("reddata-tour-completed", "true");
    setIsVisible(false);
  };

  if (!isVisible || !targetRect) return null;

  const step = TOUR_STEPS[currentStep];
  
  // Calcular posição do tooltip
  let tooltipStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
  };

  switch (step.position) {
    case "bottom":
      tooltipStyle = {
        ...tooltipStyle,
        top: targetRect.bottom + 20,
        left: targetRect.left + targetRect.width / 2,
        transform: "translateX(-50%)",
      };
      break;
    case "top":
      tooltipStyle = {
        ...tooltipStyle,
        bottom: window.innerHeight - targetRect.top + 20,
        left: targetRect.left + targetRect.width / 2,
        transform: "translateX(-50%)",
      };
      break;
  }

  return (
    <>
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-black/70 z-[9998] animate-fade-in" />

      {/* Highlight do elemento alvo */}
      <div
        className="fixed z-[9998] animate-pulse"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          border: "3px solid #E60012",
          borderRadius: "8px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 30px rgba(230, 0, 18, 0.6)",
          pointerEvents: "none",
        }}
      />

      {/* Tooltip do tour */}
      <div
        className="bg-background border border-primary/20 rounded-lg shadow-2xl p-6 max-w-md animate-scale-in"
        style={tooltipStyle}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
          <button
            onClick={handleSkip}
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Pular tour"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1.5">
            {TOUR_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "bg-primary w-6"
                    : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Anterior
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90"
            >
              {currentStep < TOUR_STEPS.length - 1 ? "Próximo" : "Finalizar"}
            </Button>
          </div>
        </div>

        <div className="mt-3 text-center">
          <button
            onClick={handleSkip}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Pular tour
          </button>
        </div>
      </div>
    </>
  );
};
