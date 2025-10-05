import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export function AuditContact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Nossa equipe entrará em contato em breve.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contato" className="py-16 px-4 bg-gradient-to-br from-[#E30613]/5 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fale com a RedMaxx
          </h2>
          <p className="text-xl text-muted-foreground">
            Solicite uma demonstração e descubra como transformar suas auditorias
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input id="nome" name="nome" required placeholder="Seu nome" />
                    </div>
                    <div>
                      <Label htmlFor="cargo">Cargo</Label>
                      <Input id="cargo" name="cargo" placeholder="Ex: Auditor, Controlador" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input id="telefone" name="telefone" type="tel" required placeholder="(00) 00000-0000" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="orgao">Órgão / Tribunal</Label>
                    <Input id="orgao" name="orgao" placeholder="Ex: TCE-SP, CGU, Controladoria Municipal" />
                  </div>

                  <div>
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea 
                      id="mensagem" 
                      name="mensagem" 
                      placeholder="Conte-nos sobre suas necessidades de auditoria..."
                      rows={5}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-[#E30613] hover:bg-[#E30613]/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar Demonstração"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="h-5 w-5 text-[#E30613] mt-1" />
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <p className="text-sm text-muted-foreground">contato@redmaxx.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <Phone className="h-5 w-5 text-[#E30613] mt-1" />
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="text-sm text-muted-foreground">(11) 3000-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#E30613] mt-1" />
                  <div>
                    <p className="font-semibold">Endereço</p>
                    <p className="text-sm text-muted-foreground">
                      São Paulo - SP<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#E30613]/10 to-background">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Demonstração Gratuita</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Agende uma apresentação personalizada do RedData.Audit para sua equipe. 
                  Mostre casos reais e veja o sistema em ação.
                </p>
                <Button variant="outline" className="w-full">
                  Agendar Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
