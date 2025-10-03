import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const whatsappNumber = "5511940764626"; // +55 11 94076-4626
  
  const openWhatsApp = () => {
    const defaultMessage = t('whatsappWidget.greeting').includes("Hello") 
      ? "Hello! I would like to know more about RedData® and request a demonstration."
      : "Olá! Gostaria de saber mais sobre o RedData® e solicitar uma demonstração.";
    const message = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        )}
        
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-border overflow-hidden w-80 animate-in slide-in-from-bottom-2">
            {/* Header */}
            <div className="bg-green-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('whatsappWidget.supportTitle')}</h3>
                    <p className="text-sm text-green-100">{t('whatsappWidget.onlineNow')}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-4">
              <div className="bg-gray-100 rounded-lg p-3 text-sm">
                <p className="text-gray-700">
                  {t('whatsappWidget.greeting')}
                </p>
                <p className="text-gray-600 mt-1">
                  {t('whatsappWidget.description')}
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">{t('whatsappWidget.servicesTitle')}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>{t('whatsappWidget.service1')}</li>
                  <li>{t('whatsappWidget.service2')}</li>
                  <li>{t('whatsappWidget.service3')}</li>
                  <li>{t('whatsappWidget.service4')}</li>
                </ul>
              </div>
              
              <Button 
                onClick={openWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t('whatsappWidget.startChat')}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                {t('whatsappWidget.schedule')}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};