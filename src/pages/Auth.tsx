import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import reddataLogo from "@/assets/reddata-logo-optimized.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Por favor, insira um e-mail válido").max(255, "Email muito longo"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").max(100, "Senha muito longa"),
});

const signupSchema = z.object({
  email: z.string().trim().email("Por favor, insira um e-mail válido").max(255, "Email muito longo"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").max(100, "Senha muito longa"),
  fullName: z.string().trim().min(1, "Nome completo é obrigatório").max(100, "Nome muito longo"),
  phone: z.string()
    .trim()
    .min(10, "Celular deve ter no mínimo 10 dígitos")
    .max(20, "Celular muito longo")
    .regex(/^[\d\s()+\-]+$/, "Use apenas números, espaços, parênteses, + ou -"),
});

// Check if password has been compromised using Have I Been Pwned API
async function checkPasswordPwned(password: string): Promise<boolean> {
  try {
    // Create SHA-1 hash of the password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    
    // Use k-Anonymity: only send first 5 characters of hash
    const prefix = hashHex.substring(0, 5);
    const suffix = hashHex.substring(5);
    
    // Query HIBP API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) {
      // If API fails, don't block signup but log warning
      console.warn('Could not check password against breach database');
      return false;
    }
    
    const text = await response.text();
    const hashes = text.split('\n');
    
    // Check if our hash suffix appears in the results
    for (const line of hashes) {
      const [hashSuffix] = line.split(':');
      if (hashSuffix === suffix) {
        return true; // Password found in breach database
      }
    }
    
    return false; // Password not found in breaches
  } catch (error) {
    console.error('Error checking password:', error);
    return false; // Don't block signup on error
  }
}

export default function Auth() {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Detectar modo inicial pela URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else if (mode === 'login') {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/chat");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const validation = isLogin 
      ? loginSchema.safeParse({ email, password })
      : signupSchema.safeParse({ email, password, fullName, phone });
      
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: t("auth.error"),
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Check if this is the user's first login
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('created_at')
            .eq('id', data.user.id)
            .single();
            
          // If profile was created recently (within last 5 minutes), send welcome email
          if (profile) {
            const createdAt = new Date(profile.created_at);
            const now = new Date();
            const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
            
            if (diffMinutes < 5) {
              // Send welcome email in background (don't wait for it)
              supabase.functions.invoke('send-welcome-email', {
                body: {
                  email: data.user.email,
                  fullName: data.user.user_metadata?.full_name || 'Usuário'
                }
              }).catch(err => {
                console.error('Failed to send welcome email:', err);
              });
            }
          }
        }
        
        toast({
          title: t("auth.loginSuccess"),
          description: t("auth.loginSuccessDesc"),
        });
        navigate("/chat"); // Redirecionando para chat
        // navigate("/dashboard"); // Desabilitado temporariamente
      } else {
        // Check if password has been compromised
        const isPwned = await checkPasswordPwned(password);
        if (isPwned) {
          toast({
            title: "Senha Comprometida",
            description: "Esta senha foi exposta em vazamentos de dados. Por favor, escolha uma senha mais segura.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        const redirectUrl = `${window.location.origin}/chat`; // Redirecionando para chat
        // const redirectUrl = `${window.location.origin}/dashboard`; // Desabilitado temporariamente
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
              phone: phone,
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
            <>
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
              <div>
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+55 11 99999-9999"
                  required={!isLogin}
                />
              </div>
            </>
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
            {isLogin && (
              <div className="mt-2 text-right">
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#D8232A] hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
            )}
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
