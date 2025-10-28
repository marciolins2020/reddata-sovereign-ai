import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactWidget = () => {
  const [isUSA, setIsUSA] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Detectar se o usuário está nos EUA
    const detectLocation = async () => {
      try {
        // Método 1: Usando timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const usTimezones = [
          'America/New_York',
          'America/Chicago',
          'America/Denver',
          'America/Los_Angeles',
          'America/Phoenix',
          'America/Anchorage',
          'Pacific/Honolulu'
        ];
        
        if (usTimezones.includes(timezone)) {
          setIsUSA(true);
          return;
        }

        // Método 2: Usando API de geolocalização (fallback)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code === 'US') {
          setIsUSA(true);
        }
      } catch (error) {
        console.log('Could not detect location, defaulting to WhatsApp');
      }
    };

    detectLocation();
  }, []);

  const handleClick = () => {
    if (isUSA) {
      // iMessage - abre o app Messages no iOS/macOS
      const phoneNumber = '+14077146552'; // Número dos EUA (Orlando)
      const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o RedData.');
      window.open(`sms:${phoneNumber}&body=${message}`, '_blank');
    } else {
      // WhatsApp
      const phoneNumber = '5511940764626'; // Brasil
      const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o RedData.');
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-6 z-[9998] flex items-end gap-2">
      {/* Botão Principal */}
      <Button
        onClick={handleClick}
        size="lg"
        className="rounded-full w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] shadow-lg hover:shadow-xl transition-all duration-300 p-0 group relative"
        aria-label={isUSA ? "Contato via iMessage" : "Contato via WhatsApp"}
        title={isUSA ? "Abrir iMessage" : "Abrir WhatsApp"}
      >
        <MessageCircle className="h-6 w-6 text-white" />
        
        {/* Badge indicando o tipo de mensagem */}
        <span className="absolute -top-1 -right-1 bg-white text-[#25D366] text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
          {isUSA ? 'iMessage' : 'WhatsApp'}
        </span>
        
        {/* Efeito de pulse */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
      </Button>

      {/* Botão de fechar (opcional) */}
      <button
        onClick={() => setIsVisible(false)}
        className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Fechar widget"
      >
        <X className="h-3 w-3 text-muted-foreground" />
      </button>
    </div>
  );
};
