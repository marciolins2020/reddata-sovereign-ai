import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AuditHero } from "@/components/reddata-audit/AuditHero";
import { AuditWhatIs } from "@/components/reddata-audit/AuditWhatIs";
import { AuditChallenges } from "@/components/reddata-audit/AuditChallenges";
import { AuditSolution } from "@/components/reddata-audit/AuditSolution";
import { AuditModules } from "@/components/reddata-audit/AuditModules";
import { AuditResults } from "@/components/reddata-audit/AuditResults";
import { AuditCases } from "@/components/reddata-audit/AuditCases";
import { AuditFAQ } from "@/components/reddata-audit/AuditFAQ";
import { AuditContact } from "@/components/reddata-audit/AuditContact";
import { AuditFooter } from "@/components/reddata-audit/AuditFooter";

const RedDataAudit = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Home
            </Button>
          </Link>
        </div>
      </header>

      <AuditHero />
      <AuditWhatIs />
      <AuditChallenges />
      <AuditSolution />
      <AuditModules />
      <AuditResults />
      <AuditCases />
      <AuditFAQ />
      <AuditContact />
      <AuditFooter />
    </div>
  );
};

export default RedDataAudit;
