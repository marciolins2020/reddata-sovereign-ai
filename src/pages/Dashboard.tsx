import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, LayoutDashboard, FileSpreadsheet, Trash2, File } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import reddataIcon from "@/assets/reddata-icon.png";
import { UploadSection } from "@/components/dashboard/UploadSection";
import { DashboardList } from "@/components/dashboard/DashboardList";
import { FileManager } from "@/components/dashboard/FileManager";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "dashboards" | "files">("upload");
  const [userFiles, setUserFiles] = useState<any[]>([]);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboardRefreshTrigger, setDashboardRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          setProfile(null);
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      } else {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [user]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching profile:", error);
      }
      return;
    }

    setProfile(data);

    if (data && !data.is_trial_active) {
      toast({
        title: "Trial expirado",
        description: "Seu período de teste de 30 dias expirou. Entre em contato para continuar usando.",
        variant: "destructive",
      });
    }

    // Fetch user files
    fetchUserFiles(userId);
  };

  const fetchUserFiles = async (userId: string) => {
    const { data, error } = await supabase
      .from("uploaded_files")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching files:", error);
      }
      return;
    }

    setUserFiles(data || []);
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      // Get file info
      const { data: fileInfo, error: fileError } = await supabase
        .from("uploaded_files")
        .select("*")
        .eq("id", fileId)
        .single();

      if (fileError) throw fileError;

      // Delete associated dashboards first
      const { error: dashboardError } = await supabase
        .from("dashboards")
        .delete()
        .eq("file_id", fileId);

      if (dashboardError) {
        console.error("Error deleting dashboards:", dashboardError);
        throw dashboardError;
      }

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("user-files")
        .remove([fileInfo.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("uploaded_files")
        .delete()
        .eq("id", fileId);

      if (dbError) throw dbError;

      // Update local state immediately
      setUserFiles(prev => prev.filter(file => file.id !== fileId));

      // Force close dropdown and trigger dashboard refresh immediately
      setDropdownOpen(false);
      setDashboardRefreshTrigger(prev => prev + 1);

      toast({
        title: "Arquivo excluído",
        description: "O arquivo e seus dashboards foram excluídos com sucesso",
      });

      // Refresh profile to update storage usage
      if (user) {
        await fetchProfile(user.id);
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Delete error:", error);
      }
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o arquivo. Tente novamente.",
        variant: "destructive",
      });
    }
    setFileToDelete(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const trialDaysLeft = profile.trial_expires_at
    ? Math.max(0, Math.ceil((new Date(profile.trial_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={reddataIcon} alt="RedData" className="h-10" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Dashboard RedData</h1>
              <p className="text-xs text-muted-foreground">
                {profile.is_trial_active ? `${trialDaysLeft} dias restantes no trial` : "Trial expirado"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="text-right hidden sm:block hover:opacity-80 transition-opacity cursor-pointer">
                  <p className="text-sm font-medium text-foreground">{profile.full_name || user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {profile.storage_used_mb?.toFixed(2) || 0} / {profile.storage_limit_mb || 10} MB usado
                  </p>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Meus Arquivos</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userFiles.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                    Nenhum arquivo carregado
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto">
                    {userFiles.map((file) => (
                      <DropdownMenuItem
                        key={file.id}
                        className="flex items-center justify-between gap-2 cursor-default"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <File className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{file.file_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.file_size_mb?.toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={() => setFileToDelete(file.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "upload"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Upload className="h-4 w-4 inline mr-2" />
            Upload de Arquivo
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "files"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileSpreadsheet className="h-4 w-4 inline mr-2" />
            Meus Arquivos
          </button>
          <button
            onClick={() => setActiveTab("dashboards")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "dashboards"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-4 w-4 inline mr-2" />
            Meus Dashboards
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {activeTab === "upload" && (
          <UploadSection 
            userId={user.id} 
            profile={profile}
            onUploadSuccess={() => {
              fetchProfile(user.id);
              setActiveTab("dashboards");
            }}
            onViewDashboards={() => setActiveTab("dashboards")}
          />
        )}
        {activeTab === "files" && (
          <FileManager 
            userId={user.id}
            onFileDeleted={() => fetchProfile(user.id)}
          />
        )}
        {activeTab === "dashboards" && (
          <DashboardList 
            userId={user.id} 
            refreshTrigger={dashboardRefreshTrigger}
          />
        )}
      </div>

      {/* Footer */}
      <DashboardFooter />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!fileToDelete} onOpenChange={() => setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir arquivo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O arquivo e todos os dashboards associados 
              serão permanentemente excluídos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => fileToDelete && handleDeleteFile(fileToDelete)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
