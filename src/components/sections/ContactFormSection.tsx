import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  municipio: string;
  cargo: string;
  interesse: string;
  mensagem: string;
}

export const ContactFormSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    municipio: "",
    cargo: "",
    interesse: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nome || !formData.email || !formData.interesse) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }
      
      setIsSubmitted(true);
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Nossa equipe entrará em contato em breve.",
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
          mensagem: ""
        });
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error: any) {
      console.error("Error sending form:", error);
      toast({
        title: "Erro ao enviar formulário",
        description: error.message || "Tente novamente ou entre em contato diretamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact-form" className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12 border-0 bg-card/50 backdrop-blur-sm">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Obrigado pelo interesse no RedData!
              </h2>
              <p className="text-muted-foreground mb-6">
                Recebemos suas informações e nossa equipe técnica entrará em contato 
                nas próximas 24 horas para agendar uma demonstração personalizada.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm text-primary font-medium">
                  Enviando material informativo por email...
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transforme seus <span className="text-primary">dados em estratégia</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Solicite uma demonstração personalizada do RedData
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="municipio">Município/Órgão</Label>
                  <Input
                    id="municipio"
                    value={formData.municipio}
                    onChange={(e) => handleInputChange("municipio", e.target.value)}
                    placeholder="Prefeitura de São Paulo"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => handleInputChange("cargo", e.target.value)}
                    placeholder="Secretário, CIO, Analista..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interesse">Interesse *</Label>
                  <Select value={formData.interesse} onValueChange={(value) => handleInputChange("interesse", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="implantacao">Implantação</SelectItem>
                      <SelectItem value="parceria">Parceria</SelectItem>
                      <SelectItem value="simulacao">Simulação</SelectItem>
                      <SelectItem value="appliance">RedData Appliance</SelectItem>
                      <SelectItem value="demonstracao">Demonstração</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem Adicional</Label>
                <Textarea
                  id="mensagem"
                  value={formData.mensagem}
                  onChange={(e) => handleInputChange("mensagem", e.target.value)}
                  placeholder="Conte-nos mais sobre suas necessidades..."
                  rows={4}
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Solicitar Demonstração
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Ao enviar este formulário, você concorda com nossa política de privacidade 
                e autoriza o contato da RedMaxx.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};