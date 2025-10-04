import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Undo,
  Redo,
  Eye,
  Settings,
  Palette,
  Grid3x3,
  LayoutTemplate,
} from "lucide-react";

interface DashboardToolbarProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onPreview?: () => void;
  onSettings?: () => void;
  onTheme?: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
}

export function DashboardToolbar({
  onUndo,
  onRedo,
  onPreview,
  onSettings,
  onTheme,
  showGrid,
  onToggleGrid,
}: DashboardToolbarProps) {
  return (
    <div className="flex items-center gap-2 px-4 h-16">
      <Button variant="ghost" size="sm" onClick={onUndo} title="Desfazer">
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onRedo} title="Refazer">
        <Redo className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-2" />

      <Button
        variant={showGrid ? "secondary" : "ghost"}
        size="sm"
        onClick={onToggleGrid}
        title="Mostrar/Ocultar Grade"
      >
        <Grid3x3 className="h-4 w-4 mr-2" />
        Grade
      </Button>

      <Button variant="ghost" size="sm" onClick={onPreview} title="Pré-visualizar">
        <Eye className="h-4 w-4 mr-2" />
        Pré-visualizar
      </Button>

      <Separator orientation="vertical" className="h-6 mx-2" />

      <Button variant="ghost" size="sm" onClick={onSettings} title="Configurações">
        <Settings className="h-4 w-4 mr-2" />
        Configurações
      </Button>

      <Button variant="ghost" size="sm" onClick={onTheme} title="Templates">
        <LayoutTemplate className="h-4 w-4 mr-2" />
        Templates
      </Button>
    </div>
  );
}
