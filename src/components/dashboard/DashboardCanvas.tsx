import { useDroppable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface DashboardCanvasProps {
  children?: React.ReactNode;
  isEmpty: boolean;
}

export function DashboardCanvas({ children, isEmpty }: DashboardCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "dashboard-canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-6 pt-24 min-h-[600px] transition-colors relative z-0 ${
        isOver ? "bg-primary/5" : "bg-muted/30"
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {isEmpty ? (
        <Card className="h-full flex items-center justify-center border-2 border-dashed">
          <div className="text-center space-y-2">
            <Plus className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground">Canvas Vazio</h3>
            <p className="text-muted-foreground">
              Arraste widgets da barra lateral para começar a criar seu dashboard
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
      )}
    </div>
  );
}
