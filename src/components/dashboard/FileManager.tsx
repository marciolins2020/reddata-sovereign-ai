import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Trash2, Download, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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

interface FileManagerProps {
  userId: string;
  onFileDeleted: () => void;
}

interface UploadedFile {
  id: string;
  file_name: string;
  file_type: string;
  file_size_mb: number;
  storage_path: string;
  created_at: string;
}

export function FileManager({ userId, onFileDeleted }: FileManagerProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<UploadedFile | null>(null);

  useEffect(() => {
    fetchFiles();
  }, [userId]);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("uploaded_files")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Erro ao carregar arquivos",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setFiles(data || []);
    }
    setLoading(false);
  };

  const handleDeleteFile = async (file: UploadedFile) => {
    setDeletingId(file.id);

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("user-files")
        .remove([file.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("uploaded_files")
        .delete()
        .eq("id", file.id);

      if (dbError) throw dbError;

      // Update user storage
      const { data: profile } = await supabase
        .from("profiles")
        .select("storage_used_mb")
        .eq("id", userId)
        .single();

      if (profile) {
        await supabase
          .from("profiles")
          .update({
            storage_used_mb: Math.max(0, profile.storage_used_mb - file.file_size_mb),
          })
          .eq("id", userId);
      }

      toast({
        title: "Arquivo deletado!",
        description: "O arquivo foi removido com sucesso",
      });

      fetchFiles();
      onFileDeleted();
    } catch (error: any) {
      console.error("Error deleting file:", error);
      toast({
        title: "Erro ao deletar arquivo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
      setFileToDelete(null);
    }
  };

  const handleDownloadFile = async (file: UploadedFile) => {
    try {
      const { data, error } = await supabase.storage
        .from("user-files")
        .download(file.storage_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download iniciado!",
        description: "O arquivo está sendo baixado",
      });
    } catch (error: any) {
      console.error("Error downloading file:", error);
      toast({
        title: "Erro ao baixar arquivo",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <Card className="p-12 text-center max-w-2xl mx-auto">
        <FileSpreadsheet className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Nenhum arquivo ainda
        </h3>
        <p className="text-muted-foreground">
          Faça upload de arquivos na aba "Upload de Arquivo" para começar
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <Card key={file.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="h-10 w-10 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{file.file_name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {file.file_size_mb.toFixed(2)} MB
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(file.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDownloadFile(file)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setFileToDelete(file)}
                  disabled={deletingId === file.id}
                >
                  {deletingId === file.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!fileToDelete} onOpenChange={() => setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar o arquivo "{fileToDelete?.file_name}"?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => fileToDelete && handleDeleteFile(fileToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
