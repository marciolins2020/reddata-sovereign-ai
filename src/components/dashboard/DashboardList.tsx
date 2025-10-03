import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Share2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardListProps {
  userId: string;
  refreshTrigger?: number;
}

export function DashboardList({ userId, refreshTrigger }: DashboardListProps) {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboards();
  }, [userId, refreshTrigger]);

  const fetchDashboards = async () => {
    setLoading(true);
    
    // Fetch existing files first
    const { data: filesData, error: filesError } = await supabase
      .from("uploaded_files")
      .select("id")
      .eq("user_id", userId);

    if (filesError) {
      console.error("Error fetching files:", filesError);
      setLoading(false);
      return;
    }

    const validFileIds = new Set(filesData?.map(f => f.id) || []);

    // Fetch all dashboards
    const { data, error } = await supabase
      .from("dashboards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching dashboards:", error);
      setLoading(false);
      return;
    }

    // Filter out orphaned dashboards and delete them
    const validDashboards = [];
    const orphanedDashboardIds = [];

    for (const dashboard of data || []) {
      if (dashboard.file_id && validFileIds.has(dashboard.file_id)) {
        validDashboards.push(dashboard);
      } else if (dashboard.file_id === null || !validFileIds.has(dashboard.file_id)) {
        orphanedDashboardIds.push(dashboard.id);
      }
    }

    // Delete orphaned dashboards in the background
    if (orphanedDashboardIds.length > 0) {
      supabase
        .from("dashboards")
        .delete()
        .in("id", orphanedDashboardIds)
        .then(({ error }) => {
          if (error) {
            console.error("Error deleting orphaned dashboards:", error);
          }
        });
    }

    setDashboards(validDashboards);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (dashboards.length === 0) {
    return (
      <Card className="p-12 text-center max-w-2xl mx-auto">
        <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Nenhum dashboard ainda
        </h3>
        <p className="text-muted-foreground mb-4">
          Faça upload de um arquivo na aba "Upload de Arquivo" para criar seu primeiro dashboard automaticamente
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboards.map((dashboard) => (
        <Card key={dashboard.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {dashboard.title}
              </h3>
              {dashboard.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {dashboard.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {dashboard.is_public && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  <Share2 className="h-3 w-3" />
                  Público
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {new Date(dashboard.created_at).toLocaleDateString()}
              </span>
            </div>

            <Button
              className="w-full"
              onClick={() => navigate(`/view/${dashboard.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
