import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Lock, Home } from "lucide-react";
import reddataIcon from "@/assets/reddata-icon.png";
import { DashboardFiltersProvider } from "@/contexts/DashboardFiltersContext";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import * as XLSX from "xlsx";

interface ChartConfig {
  id: string;
  title: string;
  chartType: string;
  xAxis?: string;
  yAxis?: string;
  column?: string;
  filterType?: string;
  sheetName: string;
}

interface SheetData {
  name: string;
  data: any[];
  columns: string[];
}

export default function PublicDashboard() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    fetchPublicDashboard();
  }, [token]);

  const fetchPublicDashboard = async () => {
    if (!token) return;

    setLoading(true);
    try {
      // Fetch dashboard by public token using secure view
      const { data, error } = await supabase
        .from("public_dashboards_view")
        .select("*")
        .eq("public_share_token", token)
        .single();

      if (error || !data) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      setDashboard(data);

      // Load chart configs
      if (data.chart_config && Array.isArray(data.chart_config)) {
        setCharts(data.chart_config as unknown as ChartConfig[]);
      }

      // Load file data
      if (data.file_id) {
        await loadFileData(data.file_id);
      }
    } catch (error) {
      console.error("Error fetching public dashboard:", error);
      setAccessDenied(true);
    } finally {
      setLoading(false);
    }
  };

  const loadFileData = async (fileId: string) => {
    try {
      // Get file info (no RLS check needed for public dashboards)
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
    } catch (error) {
      console.error("Error loading file:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (accessDenied || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground mb-6">
            Este dashboard não está disponível ou é privado
          </p>
          <Button onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <DashboardFiltersProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={reddataIcon} alt="RedData" className="h-8" />
                <div>
                  <h1 className="text-lg font-bold text-foreground">
                    {dashboard.title}
                  </h1>
                  {dashboard.description && (
                    <p className="text-sm text-muted-foreground">
                      {dashboard.description}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>
                <Home className="h-4 w-4 mr-2" />
                Ir para RedData
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div
            className="max-w-7xl mx-auto"
            style={{
              backgroundImage:
                'radial-gradient(circle, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {charts.length === 0 ? (
              <Card className="p-12 text-center">
                <h3 className="text-xl font-semibold mb-2">Dashboard Vazio</h3>
                <p className="text-muted-foreground">
                  Este dashboard ainda não tem widgets configurados
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DashboardContent
                  charts={charts}
                  sheets={sheets}
                  onDeleteChart={() => {}}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t bg-card py-4">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            Powered by RedData
          </div>
        </footer>
      </div>
    </DashboardFiltersProvider>
  );
}
