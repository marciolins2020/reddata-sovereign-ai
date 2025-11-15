import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Phone } from "lucide-react";
import { z } from "zod";

const phoneSchema = z.object({
  phone: z.string().trim().min(10, { message: "Número inválido" }).max(15, { message: "Número muito longo" }),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar telefone
    try {
      phoneSchema.parse({ phone });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("request-whatsapp-reset", {
        body: { phone: phone.trim() },
      });

      if (error) throw error;

      setCodeSent(true);
      toast.success("Se o número existir, um código foi enviado via WhatsApp");
      
      // Redirecionar para página de validação após 2 segundos
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao solicitar código:", error);
      toast.error("Erro ao processar solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (codeSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Código Enviado</CardTitle>
            <CardDescription>
              Verifique seu WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Se o número <strong>{phone}</strong> estiver cadastrado, você receberá um código de 6 dígitos via WhatsApp.
            </div>
            <div className="text-sm text-muted-foreground text-center">
              O código é válido por <strong>10 minutos</strong>.
            </div>
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Esqueceu sua senha?</CardTitle>
          <CardDescription>
            Digite seu número do WhatsApp para receber um código de verificação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="5511999999999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                maxLength={15}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Digite apenas números, com código do país e DDD (ex: 5511999999999)
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Código via WhatsApp"}
            </Button>

            <Button
              type="button"
              onClick={() => navigate("/auth")}
              variant="ghost"
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
