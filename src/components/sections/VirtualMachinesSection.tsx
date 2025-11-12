import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cloud, Server, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/lib/scroll";
import hypervIcon from "@/assets/icons/hyperv-icon-clean.png";
import vmwareIcon from "@/assets/icons/vmware-icon-transparent.png";
import proxmoxIcon from "@/assets/icons/proxmox-icon-clean.png";
import kvmIcon from "@/assets/icons/kvm-icon.png";
import virtualboxIcon from "@/assets/icons/virtualbox-icon-alt.png";
import govbrIcon from "@/assets/icons/govbr-icon-clean.png";
import azureIcon from "@/assets/icons/azure-icon-clean.png";
import awsIcon from "@/assets/icons/aws-icon-clean.png";
import gcpIcon from "@/assets/icons/gcp-icon-clean.png";

const vmProviders = [
  { name: "Hyper-V", logo: hypervIcon },
  { name: "VMware", logo: vmwareIcon },
  { name: "Proxmox", logo: proxmoxIcon },
  { name: "KVM", logo: kvmIcon },
  { name: "VirtualBox", logo: virtualboxIcon },
  { name: "Gov.br", logo: govbrIcon },
  { name: "Azure", logo: azureIcon },
  { name: "AWS", logo: awsIcon },
  { name: "GCP", logo: gcpIcon }
];

export const VirtualMachinesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 bg-background" id="vms">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-icon-bg rounded-full mb-6">
            <Settings className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('virtualMachines.badge')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('virtualMachines.title')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('virtualMachines.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Benefits */}
          <div>
            <Card className="p-8 bg-gradient-tech border-0">
              <TooltipProvider>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-12 h-12 bg-icon-bg rounded-lg flex items-center justify-center flex-shrink-0 cursor-help">
                          <Server className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('virtualMachines.benefit1Title')}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t('virtualMachines.benefit1Title')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('virtualMachines.benefit1Desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-12 h-12 bg-icon-bg rounded-lg flex items-center justify-center flex-shrink-0 cursor-help">
                          <Cloud className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('virtualMachines.benefit2Title')}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t('virtualMachines.benefit2Title')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('virtualMachines.benefit2Desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-12 h-12 bg-icon-bg rounded-lg flex items-center justify-center flex-shrink-0 cursor-help">
                          <Settings className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('virtualMachines.benefit3Title')}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t('virtualMachines.benefit3Title')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('virtualMachines.benefit3Desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            </Card>
            
            <div className="mt-8">
              <Button size="lg" onClick={() => scrollToElement('#contact-form')}>
                {t('virtualMachines.simulate')}
              </Button>
            </div>
          </div>
          
          {/* Right - Compatible Platforms */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              {t('virtualMachines.compatibleWith')}
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {vmProviders.map((provider, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center hover:shadow-medium transition-all duration-300 border-border/50 bg-card/30"
                >
                  <img 
                    src={provider.logo} 
                    alt={`${provider.name} logo`}
                    className="w-16 h-16 mx-auto mb-3 object-contain"
                    loading="lazy"
                  />
                  <h4 className="text-sm font-medium text-foreground">{provider.name}</h4>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <span className="text-sm text-muted-foreground">
                  {t('virtualMachines.manyMore')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};