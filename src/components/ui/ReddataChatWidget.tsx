import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, AlertCircle, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import reddataChatIcon from "@/assets/reddata-chat-icon.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UsageData {
  usedTokens: number;
  lastUpdateISO: string;
}

const ACCOUNT_MAX_TOKENS_PER_DAY = 10000;
const ANONYMOUS_TOKEN_LIMIT = 200;
const RATE_LIMIT_MS = 3000;

export const ReddataChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSendTime, setLastSendTime] = useState(0);
  const [usageData, setUsageData] = useState<UsageData>({ usedTokens: 0, lastUpdateISO: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasShown90Warning, setHasShown90Warning] = useState(false);
  const [anonymousTokensUsed, setAnonymousTokensUsed] = useState(0);
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasShownWelcomeRef = useRef(false);

  if (typeof window !== 'undefined' && window.location.pathname === '/chat') {
    return null;
  }

  const maxTokens = isLoggedIn ? ACCOUNT_MAX_TOKENS_PER_DAY : ANONYMOUS_TOKEN_LIMIT;
  const isLimitReached = isLoggedIn ? usageData.usedTokens >= maxTokens : anonymousTokensUsed >= ANONYMOUS_TOKEN_LIMIT;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session?.user);
      setUserId(session?.user?.id || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadUsageData();
    loadAnonymousTokens();
  }, [isLoggedIn, userId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      hasShownWelcomeRef.current = false;
      setMessages([]);
      setShowAuthOptions(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !hasShownWelcomeRef.current && messages.length === 0) {
      const tokensRemaining = isLoggedIn 
        ? ACCOUNT_MAX_TOKENS_PER_DAY - usageData.usedTokens 
        : ANONYMOUS_TOKEN_LIMIT - anonymousTokensUsed;
      
      setMessages([{
        role: "assistant",
        content: `👋 **Bem-vindo ao RedData AI!**

Você tem **${tokensRemaining} tokens gratuitos** para testar nossas capacidades de IA.

**Ao criar uma conta gratuita:**
- 🔓 **10.000 tokens/dia** (50x mais!)
- 💾 **Histórico de conversas** salvo
- ⏰ **Sem limites**
- 🔄 **Renovação diária** automática

**Você já tem uma conta?`
      }]);
      hasShownWelcomeRef.current = true;
      setShowAuthOptions(!isLoggedIn);
    }
  }, [isOpen, isLoggedIn, messages.length, anonymousTokensUsed, usageData.usedTokens]);

  useEffect(() => {
    const usagePercentage = (usageData.usedTokens / maxTokens) * 100;
    if (usagePercentage >= 90 && !hasShown90Warning && usageData.usedTokens > 0 && isLoggedIn) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "⚠️ Atenção: Você já utilizou 90% do seu limite diário de tokens."
      }]);
      setHasShown90Warning(true);
    }
  }, [usageData.usedTokens, maxTokens, hasShown90Warning, isLoggedIn]);

  const getStorageKey = () => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    if (isLoggedIn && userId) {
      return `rd_usage_${userId}_${today}`;
    }
    return `rd_usage_device_${today}`;
  };

  const loadUsageData = () => {
    const key = getStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const data = JSON.parse(stored) as UsageData;
        setUsageData(data);
      } catch {
        setUsageData({ usedTokens: 0, lastUpdateISO: new Date().toISOString() });
      }
    } else {
      setUsageData({ usedTokens: 0, lastUpdateISO: new Date().toISOString() });
      setHasShown90Warning(false);
    }
  };

  const loadAnonymousTokens = () => {
    if (isLoggedIn) {
      setAnonymousTokensUsed(0);
      return;
    }

    const stored = localStorage.getItem('reddata_anonymous_tokens');
    if (stored) {
      setAnonymousTokensUsed(parseInt(stored, 10));
    }
  };

  const updateUsageData = (tokens: number) => {
    const newUsage = {
      usedTokens: usageData.usedTokens + tokens,
      lastUpdateISO: new Date().toISOString()
    };
    setUsageData(newUsage);
    localStorage.setItem(getStorageKey(), JSON.stringify(newUsage));
  };

  const estimateTokens = (text: string) => {
    return Math.ceil(text.length / 4);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isLimitReached) return;

    if (!isLoggedIn && anonymousTokensUsed >= ANONYMOUS_TOKEN_LIMIT) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "🎯 **Você usou seus tokens gratuitos!**\n\nPara continuar com **10.000 tokens/dia**, faça login ou crie sua conta gratuita."
      }]);
      setShowAuthOptions(true);
      return;
    }

    const now = Date.now();
    if (now - lastSendTime < RATE_LIMIT_MS) {
      setError("Aguarde alguns segundos antes de enviar outra mensagem.");
      return;
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    const inputTokens = estimateTokens(input);

    if (isLoggedIn && usageData.usedTokens + inputTokens > maxTokens) {
      setError("Limite de tokens atingido. Tente novamente amanhã.");
      return;
    }

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);
    setLastSendTime(now);

    setMessages(prev => [...prev, { role: "assistant", content: "" }]);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reddata-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isLoggedIn && {
              "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
            })
          },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao processar mensagem");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { role: "assistant", content: assistantMessage };
                  return newMessages;
                });
              }
            } catch {}
          }
        }
      }

      const totalTokens = inputTokens + estimateTokens(assistantMessage);

      if (isLoggedIn) {
        updateUsageData(totalTokens);
      } else {
        const newTotal = anonymousTokensUsed + totalTokens;
        setAnonymousTokensUsed(newTotal);
        localStorage.setItem('reddata_anonymous_tokens', newTotal.toString());
      }

    } catch (err: any) {
      if (err.name === 'AbortError') return;
      
      setError(err.message || "Erro ao enviar mensagem.");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-[10000] flex flex-col items-end gap-2">
      {!isOpen && (
        <button onClick={toggleChat} className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200">
          <img src={reddataChatIcon} alt="RedData" className="w-full h-full object-contain" />
        </button>
      )}

      {isOpen && (
        <Card className="fixed inset-0 w-full h-full md:relative md:w-[380px] md:h-[600px] md:shadow-2xl flex flex-col md:rounded-lg rounded-none z-[10001]">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white pb-2 md:pb-3 pt-3 md:pt-4">
            <div className="flex items-center justify-between gap-1.5 md:gap-2">
              <div className="flex items-center gap-1.5 md:gap-3 min-w-0 flex-1">
                <img src={reddataChatIcon} alt="RedData" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                <div className="min-w-0 flex-1 overflow-hidden">
                  <CardTitle className="text-sm md:text-lg truncate leading-tight">RedData AI</CardTitle>
                  <CardDescription className="text-white/80 text-[10px] md:text-xs truncate leading-tight">
                    {!isLoggedIn ? `${Math.max(0, ANONYMOUS_TOKEN_LIMIT - anonymousTokensUsed)} tokens restantes` : 'Versão Basic'}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/chat'} className="text-white hover:bg-white/20 h-7 w-7 p-0">
                  <Maximize2 className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={toggleChat} className="text-white hover:bg-white/20 h-7 w-7 p-0">
                  <X className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-3 md:p-4 flex flex-col gap-3 overflow-hidden">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <ScrollArea ref={scrollRef} className="flex-1 pr-3">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${msg.role === "user" ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-2.5">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {showAuthOptions && (
              <div className="flex gap-2 mb-2">
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/auth?mode=login'} className="flex-1 text-xs">
                  Sim, fazer login
                </Button>
                <Button variant="default" size="sm" onClick={() => window.location.href = '/auth?mode=signup'} className="flex-1 text-xs">
                  Não, criar conta
                </Button>
              </div>
            )}

            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={isLimitReached ? "Limite atingido" : "Digite sua mensagem..."}
                className="flex-1 min-h-[44px] max-h-32 resize-none"
                disabled={isLoading || isLimitReached}
              />
              <Button onClick={sendMessage} disabled={isLoading || !input.trim() || isLimitReached} size="icon" className="h-[44px] w-[44px]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
