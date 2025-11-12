import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";

const contactFormSchema = z.object({
  nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().trim().email("Email inválido").max(255, "Email deve ter no máximo 255 caracteres"),
  telefone: z.string().trim().max(20, "Telefone deve ter no máximo 20 caracteres").optional(),
  municipio: z.string().trim().max(100, "Município deve ter no máximo 100 caracteres").optional(),
  cargo: z.string().trim().max(100, "Cargo deve ter no máximo 100 caracteres").optional(),
  interesse: z.string().min(1, "Selecione uma opção de interesse"),
  mensagem: z.string().trim().max(2000, "Mensagem deve ter no máximo 2000 caracteres").optional(),
});

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  municipio: string;
  cargo: string;
  interesse: string;
  mensagem: string;
  lgpd: boolean;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  municipio?: string;
  cargo?: string;
  interesse?: string;
  mensagem?: string;
  lgpd?: string;
}

export const ContactFormSection = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    municipio: "",
    cargo: "",
    interesse: "",
    mensagem: "",
    lgpd: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === "lgpd") {
      setFormData(prev => ({ ...prev, [field]: value === "true" }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Comprehensive validation with zod
    try {
      contactFormSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: "Erro de validação",
          description: "Por favor, corrija os erros no formulário.",
          variant: "destructive"
        });
      }
      return;
    }
    
    // Validate LGPD checkbox
    if (!formData.lgpd) {
      setErrors({ lgpd: "Você deve aceitar a Política de Privacidade para continuar." });
      toast({
        title: "Erro de validação",
        description: "Você deve aceitar a Política de Privacidade.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { ...formData, language }
      });

      if (error) {
        throw error;
      }
      
      setIsSubmitted(true);
      toast({
        title: t('contact.successMessage'),
        description: t('contact.successMessage'),
      });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          municipio: "",
          cargo: "",
          interesse: "",
          mensagem: "",
          lgpd: false
        });
        setErrors({});
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Error sending form:", error);
      }
      toast({
        title: t('contact.errorMessage'),
        description: "Tente novamente ou entre em contato diretamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact-form" className="py-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12 border-0 bg-card/50 backdrop-blur-sm">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('contact.successTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('contact.successMessage')}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-icon-bg rounded-full">
                <span className="text-sm text-primary font-medium">
                  {t('contact.successSending')}
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-12 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">{t('contact.nameLabel')} *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder={t('contact.namePlaceholder')}
                    required
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? "err-nome" : undefined}
                  />
                  {errors.nome && (
                    <span id="err-nome" className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.nome}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.emailLabel')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                  />
                  {errors.email && (
                    <span id="err-email" className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="telefone">{t('contact.phoneLabel')}</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    inputMode="tel"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="+55 (__)  _____-____"
                    aria-invalid={!!errors.telefone}
                    aria-describedby={errors.telefone ? "err-telefone" : undefined}
                  />
                  {errors.telefone && (
                    <span id="err-telefone" className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.telefone}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="municipio">{t('contact.municipioLabel')}</Label>
                  <Input
                    id="municipio"
                    value={formData.municipio}
                    onChange={(e) => handleInputChange("municipio", e.target.value)}
                    placeholder={t('contact.municipioPlaceholder')}
                    aria-invalid={!!errors.municipio}
                    aria-describedby={errors.municipio ? "err-municipio" : undefined}
                  />
                  {errors.municipio && (
                    <span id="err-municipio" className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.municipio}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cargo">{t('contact.cargoLabel')}</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => handleInputChange("cargo", e.target.value)}
                    placeholder={t('contact.cargoPlaceholder')}
                    aria-invalid={!!errors.cargo}
                    aria-describedby={errors.cargo ? "err-cargo" : undefined}
                  />
                  {errors.cargo && (
                    <span id="err-cargo" className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.cargo}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interesse">{t('contact.interestLabel')} *</Label>
                  <Select value={formData.interesse} onValueChange={(value) => handleInputChange("interesse", value)}>
                    <SelectTrigger aria-invalid={!!errors.interesse} aria-describedby={errors.interesse ? "err-interesse" : undefined}>
                      <SelectValue placeholder={t('contact.interestPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="implantacao">{t('contact.interestImplantacao')}</SelectItem>
                      <SelectItem value="parceria">{t('contact.interestParceria')}</SelectItem>
                      <SelectItem value="simulacao">{t('contact.interestSimulacao')}</SelectItem>
                      <SelectItem value="appliance">{t('contact.interestAppliance')}</SelectItem>
                      <SelectItem value="demonstracao">{t('contact.interestDemonstracao')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.interesse && (
                    <span id="err-interesse" className="text-sm text-destructive" role="alert" aria-live="polite">
                      {errors.interesse}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mensagem">{t('contact.messageLabel')}</Label>
                <Textarea
                  id="mensagem"
                  value={formData.mensagem}
                  onChange={(e) => handleInputChange("mensagem", e.target.value)}
                  placeholder={t('contact.messagePlaceholder')}
                  rows={4}
                  aria-invalid={!!errors.mensagem}
                  aria-describedby={errors.mensagem ? "err-mensagem" : undefined}
                />
                {errors.mensagem && (
                  <span id="err-mensagem" className="text-sm text-destructive" role="alert" aria-live="polite">
                    {errors.mensagem}
                  </span>
                )}
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border">
                <Checkbox 
                  id="lgpd" 
                  checked={formData.lgpd}
                  onCheckedChange={(checked) => handleInputChange("lgpd", String(checked))}
                  aria-invalid={!!errors.lgpd}
                  aria-describedby={errors.lgpd ? "err-lgpd" : undefined}
                />
                <div className="space-y-1">
                  <Label htmlFor="lgpd" className="text-sm font-medium leading-tight cursor-pointer">
                    Li e concordo com a Política de Privacidade (LGPD) *
                  </Label>
                  {errors.lgpd && (
                    <span id="err-lgpd" className="text-sm text-destructive block" role="alert" aria-live="polite">
                      {errors.lgpd}
                    </span>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
                {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                {t('contact.privacyText')}
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};