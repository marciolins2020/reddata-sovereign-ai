import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface ThemeConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (theme: DashboardTheme) => void;
  currentTheme?: DashboardTheme;
}

export interface DashboardTheme {
  name: string;
  colors: string[];
  backgroundColor: string;
}

const predefinedThemes: DashboardTheme[] = [
  {
    name: "Padrão",
    colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"],
    backgroundColor: "#ffffff",
  },
  {
    name: "Oceano",
    colors: ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087"],
    backgroundColor: "#f0f9ff",
  },
  {
    name: "Floresta",
    colors: ["#1a4d2e", "#4f7942", "#80b918", "#c6d57e", "#e8efcf"],
    backgroundColor: "#f7fef8",
  },
  {
    name: "Pôr do Sol",
    colors: ["#ff6b35", "#f7931e", "#fdc82f", "#f2c057", "#e8b87b"],
    backgroundColor: "#fffdf7",
  },
  {
    name: "Corporativo",
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
    backgroundColor: "#fafafa",
  },
  {
    name: "Minimalista",
    colors: ["#2c3e50", "#34495e", "#7f8c8d", "#95a5a6", "#bdc3c7"],
    backgroundColor: "#ffffff",
  },
];

export function ThemeConfigModal({
  isOpen,
  onClose,
  onSave,
  currentTheme,
}: ThemeConfigModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<DashboardTheme>(
    currentTheme || predefinedThemes[0]
  );

  const handleSave = () => {
    onSave(selectedTheme);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Configurar Tema do Dashboard</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-base mb-3 block">Temas Predefinidos</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {predefinedThemes.map((theme, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedTheme.name === theme.name
                      ? "border-2 border-primary"
                      : "border"
                  }`}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{theme.name}</span>
                    {selectedTheme.name === theme.name && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div
                    className="h-8 rounded mb-2"
                    style={{ backgroundColor: theme.backgroundColor }}
                  />
                  <div className="flex gap-1">
                    {theme.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="flex-1 h-6 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <Label className="text-base mb-3 block">Pré-visualização</Label>
            <Card
              className="p-6"
              style={{ backgroundColor: selectedTheme.backgroundColor }}
            >
              <div className="space-y-3">
                <div className="flex gap-2">
                  {selectedTheme.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 h-16 rounded-lg shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  As cores serão aplicadas aos gráficos do dashboard
                </div>
              </div>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Aplicar Tema</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
