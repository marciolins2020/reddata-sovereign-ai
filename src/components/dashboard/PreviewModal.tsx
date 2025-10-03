import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

type DeviceType = "desktop" | "tablet" | "mobile";

export function PreviewModal({ isOpen, onClose, children }: PreviewModalProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");

  const getDeviceSize = () => {
    switch (device) {
      case "desktop":
        return "w-full h-[600px]";
      case "tablet":
        return "w-[768px] h-[600px]";
      case "mobile":
        return "w-[375px] h-[667px]";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Pré-visualização do Dashboard</DialogTitle>
            <div className="flex gap-2">
              <Button
                variant={device === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setDevice("desktop")}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={device === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setDevice("tablet")}
              >
                <Tablet className="h-4 w-4 mr-2" />
                Tablet
              </Button>
              <Button
                variant={device === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setDevice("mobile")}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center justify-center flex-1 overflow-hidden bg-muted/20 rounded-lg">
          <div
            className={cn(
              "transition-all duration-300 bg-background shadow-2xl overflow-auto",
              getDeviceSize()
            )}
          >
            <div className="p-4">{children}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
