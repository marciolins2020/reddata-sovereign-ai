import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Loader2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import reddataIcon from "@/assets/reddata-icon.png";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ChartWidgetsSidebar } from "@/components/dashboard/ChartWidgetsSidebar";
import { DashboardCanvas } from "@/components/dashboard/DashboardCanvas";
import { ChartConfigModal } from "@/components/dashboard/ChartConfigModal";
import { ChartWidget } from "@/components/dashboard/ChartWidget";
import { DashboardToolbar } from "@/components/dashboard/DashboardToolbar";
import * as XLSX from "xlsx";

interface ChartConfig {
  id: string;
  title: string;
  chartType: string;
  xAxis: string;
  yAxis: string;
  sheetName: string;
}

interface SheetData {
  name: string;
  data: any[];
  columns: string[];
}

export default function DashboardView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [pendingChartType, setPendingChartType] = useState("");
  const [saving, setSaving] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

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

    // Load existing chart configs
    if (data.chart_config && Array.isArray(data.chart_config)) {
      setCharts(data.chart_config as unknown as ChartConfig[]);
    }

    // Load file data
    if (data.file_id) {
      await loadFileData(data.file_id);
    }

    setLoading(false);
  };

  const loadFileData = async (fileId: string) => {
    try {
      // Get file info
      const { data: fileInfo, error: fileError } = await supabase
        .from("uploaded_files")
        .select("*")
        .eq("id", fileId)
        .single();

      if (fileError) throw fileError;

      // Download file from storage
      const { data: fileBlob, error: downloadError } = await supabase.storage
        .from("user-files")
        .download(fileInfo.storage_path);

      if (downloadError) throw downloadError;

      // Parse Excel file
      const arrayBuffer = await fileBlob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // Read ALL sheets
      const allSheets: SheetData[] = [];
      
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length > 0) {
          const columns = Object.keys(jsonData[0]);
          allSheets.push({
            name: sheetName,
            data: jsonData,
            columns: columns,
          });
        }
      });

      setSheets(allSheets);

      if (allSheets.length > 0) {
        toast({
          title: "Arquivo carregado!",
          description: `${allSheets.length} aba(s) encontrada(s) com dados`,
        });
      }
    } catch (error: any) {
      console.error("Error loading file:", error);
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === "dashboard-canvas") {
      const chartType = active.data.current?.type;
      if (chartType) {
        setPendingChartType(chartType);
        setConfigModalOpen(true);
      }
    }
  };

  const handleSaveChart = (config: any) => {
    const newChart: ChartConfig = {
      id: `chart-${Date.now()}`,
      ...config,
    };

    setCharts((prev) => [...prev, newChart]);
    
    toast({
      title: "Gráfico adicionado!",
      description: "Não esqueça de salvar o dashboard",
    });
  };

  const handleDeleteChart = (chartId: string) => {
    setCharts((prev) => prev.filter((c) => c.id !== chartId));
  };

  const handleSaveDashboard = async () => {
    if (!id) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("dashboards")
        .update({
          chart_config: charts as any,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Dashboard salvo!",
        description: "Todas as alterações foram salvas com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Dashboard não encontrado</h2>
          <Button onClick={() => navigate("/dashboard")}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
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
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveDashboard}
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Salvar
                </Button>
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <DashboardToolbar
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid(!showGrid)}
            onPreview={() => toast({ title: "Pré-visualização", description: "Em desenvolvimento" })}
            onSettings={() => toast({ title: "Configurações", description: "Em desenvolvimento" })}
            onTheme={() => toast({ title: "Temas", description: "Em desenvolvimento" })}
          />
          
          <div className="flex-1 flex">
            <ChartWidgetsSidebar />
            <DashboardCanvas isEmpty={charts.length === 0}>
              {charts.map((chart) => {
                const sheetData = sheets.find(s => s.name === chart.sheetName);
                return (
                  <ChartWidget
                    key={chart.id}
                    id={chart.id}
                    config={chart}
                    data={sheetData?.data || []}
                    onDelete={handleDeleteChart}
                  />
                );
              })}
            </DashboardCanvas>
          </div>
        </div>

        {/* Config Modal */}
        <ChartConfigModal
          isOpen={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          onSave={handleSaveChart}
          chartType={pendingChartType}
          sheets={sheets}
        />
      </div>
    </DndContext>
  );
}
