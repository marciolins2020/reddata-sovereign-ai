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
    <div className="flex items-center gap-2 px-4 py-2 border-b bg-card">
      <Button variant="ghost" size="sm" onClick={onUndo}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onRedo}>
        <Redo className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-2" />

      <Button
        variant={showGrid ? "secondary" : "ghost"}
        size="sm"
        onClick={onToggleGrid}
      >
        <Grid3x3 className="h-4 w-4 mr-2" />
        Grade
      </Button>

      <Button variant="ghost" size="sm" onClick={onPreview}>
        <Eye className="h-4 w-4 mr-2" />
        Pré-visualizar
      </Button>

      <Separator orientation="vertical" className="h-6 mx-2" />

      <Button variant="ghost" size="sm" onClick={onTheme}>
        <Palette className="h-4 w-4 mr-2" />
        Tema
      </Button>

      <Button variant="ghost" size="sm" onClick={onSettings}>
        <LayoutTemplate className="h-4 w-4 mr-2" />
        Templates
      </Button>
    </div>
  );
}
