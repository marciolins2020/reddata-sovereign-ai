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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dashboardTemplates, DashboardTemplate } from "@/data/dashboardTemplates";
import { Check } from "lucide-react";

interface TemplateGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: DashboardTemplate) => void;
}

export function TemplateGallery({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplateGalleryProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<DashboardTemplate | null>(
    null
  );

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onClose();
      setSelectedTemplate(null);
    }
  };

  const categories = Array.from(new Set(dashboardTemplates.map((t) => t.category)));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Galeria de Templates</DialogTitle>
          <DialogDescription>
            Escolha um template pronto para começar seu dashboard rapidamente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardTemplates
                  .filter((t) => t.category === category)
                  .map((template) => (
                    <Card
                      key={template.id}
                      className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedTemplate?.id === template.id
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="text-4xl">{template.thumbnail}</div>
                          {selectedTemplate?.id === template.id && (
                            <div className="bg-primary rounded-full p-1">
                              <Check className="h-4 w-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">
                            {template.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {template.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {template.widgets.length} widgets
                        </Badge>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleApplyTemplate} disabled={!selectedTemplate}>
            Aplicar Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
