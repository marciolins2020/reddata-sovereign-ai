import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Share2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import reddataIcon from "@/assets/reddata-icon.png";

export default function DashboardView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, [id]);

  const fetchDashboard = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("dashboards")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching dashboard:", error);
      toast({
        title: "Erro ao carregar dashboard",
        description: error.message,
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    setDashboard(data);
    setLoading(false);
  };

  const handleShare = () => {
    toast({
      title: "Link copiado!",
      description: "Link do dashboard copiado para a área de transferência",
    });
    navigator.clipboard.writeText(window.location.href);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Dashboard não encontrado</h2>
          <Button onClick={() => navigate("/dashboard")}>
            Voltar ao Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <img src={reddataIcon} alt="RedData" className="h-8" />
              <div>
                <h1 className="text-lg font-bold text-foreground">{dashboard.title}</h1>
                {dashboard.description && (
                  <p className="text-sm text-muted-foreground">{dashboard.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Dashboard Interativo</h3>
            <p className="text-muted-foreground">
              Aqui será exibido o dashboard interativo com os dados do arquivo.
            </p>
            <p className="text-sm text-muted-foreground">
              Arquivo ID: {dashboard.file_id}
            </p>
            <div className="pt-8 text-left">
              <h4 className="font-semibold mb-4">Informações do Dashboard:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Título:</strong> {dashboard.title}</p>
                <p><strong>Criado em:</strong> {new Date(dashboard.created_at).toLocaleString('pt-BR')}</p>
                <p><strong>Última atualização:</strong> {new Date(dashboard.updated_at).toLocaleString('pt-BR')}</p>
                <p><strong>Status:</strong> {dashboard.is_public ? 'Público' : 'Privado'}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
