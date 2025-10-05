import reddataIcon from "@/assets/reddata-icon.png";
import redmaxxLogo from "@/assets/redmaxx-logo.png";

export function DashboardFooter() {
  return (
    <footer className="border-t bg-card/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <img src={reddataIcon} alt="RedData" className="h-8" width="32" height="32" loading="lazy" />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Um produto da</span>
            <img src={redmaxxLogo} alt="RedMaxx" className="h-6" width="60" height="24" loading="lazy" />
          </div>
        </div>
      </div>
    </footer>
  );
}
