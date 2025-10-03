import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Copy, Globe, Lock, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ShareDashboardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: string;
  isPublic: boolean;
  publicToken: string | null;
  onUpdate: () => void;
}

export function ShareDashboardDialog({
  isOpen,
  onClose,
  dashboardId,
  isPublic,
  publicToken,
  onUpdate,
}: ShareDashboardDialogProps) {
  const [isPublicState, setIsPublicState] = useState(isPublic);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = publicToken
    ? `${window.location.origin}/public/${publicToken}`
    : "";

  const handleTogglePublic = async (checked: boolean) => {
    setIsPublicState(checked);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let token = publicToken;

      // Generate new token if making public and doesn't have one
      if (isPublicState && !token) {
        token = crypto.randomUUID();
      }

      const { error } = await supabase
        .from("dashboards")
        .update({
          is_public: isPublicState,
          public_share_token: isPublicState ? token : null,
        })
        .eq("id", dashboardId);

      if (error) throw error;

      toast({
        title: "Configurações salvas!",
        description: isPublicState
          ? "Dashboard agora é público"
          : "Dashboard agora é privado",
      });

      onUpdate();
      onClose();
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

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Dashboard</DialogTitle>
          <DialogDescription>
            Gerencie as configurações de compartilhamento do seu dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dashboard Público</Label>
              <p className="text-sm text-muted-foreground">
                Qualquer pessoa com o link pode visualizar
              </p>
            </div>
            <Switch checked={isPublicState} onCheckedChange={handleTogglePublic} />
          </div>

          {isPublicState && (
            <div className="space-y-2">
              <Label>Link de Compartilhamento</Label>
              <div className="flex gap-2">
                <Input value={shareUrl} readOnly className="flex-1" />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopyLink}
                  disabled={!shareUrl}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Globe className="h-3 w-3" />
                Este link é único e pode ser compartilhado com qualquer pessoa
              </p>
            </div>
          )}

          {!isPublicState && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Dashboard privado - apenas você pode visualizar
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
