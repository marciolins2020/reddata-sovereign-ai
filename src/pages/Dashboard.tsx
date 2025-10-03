import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, LayoutDashboard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import reddataIcon from "@/assets/reddata-icon.png";
import { UploadSection } from "@/components/dashboard/UploadSection";
import { DashboardList } from "@/components/dashboard/DashboardList";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "dashboards">("upload");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        } else {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
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

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
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
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{profile.full_name || user.email}</p>
              <p className="text-xs text-muted-foreground">
                {profile.storage_used_mb?.toFixed(2) || 0} / {profile.storage_limit_mb || 10} MB usado
              </p>
            </div>
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
          />
        )}
        {activeTab === "dashboards" && <DashboardList userId={user.id} />}
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
}
