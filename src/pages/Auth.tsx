import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import reddataLogo from "@/assets/reddata-logo-optimized.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Auth() {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: t("auth.loginSuccess"),
          description: t("auth.loginSuccessDesc"),
        });
        navigate("/dashboard");
      } else {
        const redirectUrl = `${window.location.origin}/dashboard`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
            }
          }
        });
        
        if (error) throw error;
        
        toast({
          title: t("auth.signupSuccess"),
          description: t("auth.signupSuccessDesc"),
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        title: t("auth.error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md p-8 shadow-large">
        <div className="flex flex-col items-center mb-8">
          <img src={reddataLogo} alt="RedData" className="h-12 mb-4" />
          <h1 className="text-2xl font-bold text-foreground">
            {isLogin ? t("auth.login") : t("auth.signup")}
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            {isLogin ? t("auth.loginSubtitle") : t("auth.signupSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="fullName">{t("auth.fullNameLabel")}</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("auth.fullNamePlaceholder")}
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email">{t("auth.emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">{t("auth.passwordLabel")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? t("auth.loginButton") : t("auth.signupButton")}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:underline"
          >
            {isLogin
              ? t("auth.noAccount")
              : t("auth.hasAccount")}
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            {t("auth.backHome")}
          </a>
        </div>
      </Card>
    </div>
  );
}
