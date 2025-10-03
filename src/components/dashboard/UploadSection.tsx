import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet, Loader2 } from "lucide-react";

// Helper function to generate slug
const generateSlug = async (title: string): Promise<string> => {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
    .substring(0, 50);
  
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  return `${baseSlug}-${randomSuffix}`;
};

interface UploadSectionProps {
  userId: string;
  profile: any;
  onUploadSuccess: () => void;
  onViewDashboards: () => void;
}

export function UploadSection({ userId, profile, onUploadSuccess, onViewDashboards }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      
      if (fileSizeMB > 10) {
        toast({
          title: "Arquivo muito grande",
          description: "O tamanho máximo permitido é 10MB",
          variant: "destructive",
        });
        return;
      }

      if (profile.storage_used_mb + fileSizeMB > profile.storage_limit_mb) {
        toast({
          title: "Limite de armazenamento atingido",
          description: "Você não tem espaço suficiente para este arquivo",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    if (!profile.is_trial_active) {
      toast({
        title: "Trial expirado",
        description: "Seu período de teste expirou. Entre em contato para continuar.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileSizeMB = file.size / (1024 * 1024);
      const fileName = `${userId}/${Date.now()}_${file.name}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("user-files")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save file metadata
      const { data: fileData, error: dbError } = await supabase
        .from("uploaded_files")
        .insert({
          user_id: userId,
          file_name: file.name,
          file_type: file.type,
          file_size_mb: fileSizeMB,
          storage_path: fileName,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Create a dashboard automatically with slug
      const dashboardTitle = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      const { data: dashboardData, error: dashboardError } = await supabase
        .from("dashboards")
        .insert({
          user_id: userId,
          file_id: fileData.id,
          title: dashboardTitle,
          description: `Dashboard criado automaticamente para ${file.name}`,
          chart_config: {},
        })
        .select()
        .single();

      if (dashboardError) throw dashboardError;

      // Generate slug using SQL function
      if (dashboardData) {
        const { error: slugError } = await supabase
          .from("dashboards")
          .update({ 
            slug: await generateSlug(dashboardTitle) 
          })
          .eq("id", dashboardData.id);

        if (slugError) console.error("Error generating slug:", slugError);
      }

      // Update storage used
      await supabase
        .from("profiles")
        .update({ storage_used_mb: profile.storage_used_mb + fileSizeMB })
        .eq("id", userId);

      toast({
        title: "Dashboard criado!",
        description: "Arquivo enviado e dashboard criado com sucesso.",
      });

      setFile(null);
      onUploadSuccess();
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Upload error:", error);
      }
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer o upload. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <FileSpreadsheet className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Upload de Dados</h2>
          <p className="text-muted-foreground">
            Envie arquivos CSV, Excel ou TXT para análise (máximo 10MB)
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Selecione um arquivo</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".csv,.txt,.xls,.xlsx"
              disabled={uploading || !profile.is_trial_active}
            />
            {file && (
              <p className="text-sm text-muted-foreground mt-2">
                Arquivo selecionado: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <Button
            onClick={handleUpload}
            disabled={!file || uploading || !profile.is_trial_active}
            className="w-full"
            size="lg"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Fazer Upload
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onViewDashboards}
            className="w-full"
            size="lg"
          >
            <FileSpreadsheet className="mr-2 h-5 w-5" />
            Ver Dashboards Existentes
          </Button>
        </div>

        {!profile.is_trial_active && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
            <p className="text-sm text-destructive font-medium">
              Seu período de teste expirou. Entre em contato para continuar usando o RedData.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
