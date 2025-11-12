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

interface TrialData {
  startTime: number;
  hasSeenWarning: boolean;
}

const ACCOUNT_MAX_TOKENS_PER_DAY = 10000;
const DEVICE_MAX_TOKENS_PER_DAY = 2000;
const RATE_LIMIT_MS = 3000;
const TRIAL_DURATION_MS = 5 * 60 * 1000; // 5 minutos

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
  const [trialData, setTrialData] = useState<TrialData | null>(null);
  const [trialTimeLeft, setTrialTimeLeft] = useState<number>(0);
  const [showTrialWarning, setShowTrialWarning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasShownWelcomeRef = useRef(false);

  const maxTokens = isLoggedIn ? ACCOUNT_MAX_TOKENS_PER_DAY : DEVICE_MAX_TOKENS_PER_DAY;
  const isLimitReached = usageData.usedTokens >= maxTokens;

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
    loadTrialData();
  }, [isLoggedIn, userId]);

  useEffect(() => {
    if (!isLoggedIn && trialData) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - trialData.startTime;
        const remaining = Math.max(0, TRIAL_DURATION_MS - elapsed);
        setTrialTimeLeft(remaining);
        
        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn, trialData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Mostrar mensagem de trial ao abrir o widget pela primeira vez
  useEffect(() => {
    if (isOpen && !isLoggedIn && !hasShownWelcomeRef.current && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: `👋 Olá! Você está no período de teste gratuito de 5 minutos do RedData AI.\n\n✨ Após fazer login, você pode:\n• Usar gratuitamente com ${ACCOUNT_MAX_TOKENS_PER_DAY.toLocaleString()} tokens/dia\n• Conversar sem limitações de tempo\n• Salvar todo o histórico de conversas\n\nComo posso ajudar?`
      }]);
      hasShownWelcomeRef.current = true;
    }
  }, [isOpen, isLoggedIn, messages.length]);

  useEffect(() => {
    const usagePercentage = (usageData.usedTokens / maxTokens) * 100;
    if (usagePercentage >= 90 && !hasShown90Warning && usageData.usedTokens > 0) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "⚠️ Atenção: Você já utilizou 90% do seu limite diário de tokens. Entre em contato com a RedMaxx para continuar usando o chat após atingir o limite."
      }]);
      setHasShown90Warning(true);
    }
  }, [usageData.usedTokens, maxTokens, hasShown90Warning]);

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

  const loadTrialData = () => {
    if (isLoggedIn) {
      localStorage.removeItem('reddata_trial');
      setTrialData(null);
      return;
    }

    const stored = localStorage.getItem('reddata_trial');
    if (stored) {
      const data = JSON.parse(stored);
      setTrialData(data);
      const elapsed = Date.now() - data.startTime;
      const remaining = Math.max(0, TRIAL_DURATION_MS - elapsed);
      setTrialTimeLeft(remaining);
      
      if (!data.hasSeenWarning && messages.length === 0) {
        setShowTrialWarning(true);
      }
    } else {
      const newData: TrialData = {
        startTime: Date.now(),
        hasSeenWarning: false
      };
      localStorage.setItem('reddata_trial', JSON.stringify(newData));
      setTrialData(newData);
      setTrialTimeLeft(TRIAL_DURATION_MS);
      setShowTrialWarning(true);
    }
  };

  const markTrialWarningSeen = () => {
    if (trialData) {
      const updated = { ...trialData, hasSeenWarning: true };
      localStorage.setItem('reddata_trial', JSON.stringify(updated));
      setTrialData(updated);
      setShowTrialWarning(false);
    }
  };

  const updateUsageData = (tokens: number) => {
    const newUsage = {
      usedTokens: usageData.usedTokens + tokens,
      lastUpdateISO: new Date().toISOString()
    };
    setUsageData(newUsage);
    localStorage.setItem(getStorageKey(), JSON.stringify(newUsage));

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'rdchat_message_sent', {
        tokens_used: tokens,
        total_tokens: newUsage.usedTokens,
        is_logged_in: isLoggedIn
      });
    }
  };

  const estimateTokens = (text: string) => {
    return Math.ceil(text.length / 4);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isLimitReached) return;

    // Verificar trial expirado
    if (!isLoggedIn && trialTimeLeft === 0) {
      setError("Seu período de teste de 5 minutos acabou. Faça login para continuar usando gratuitamente.");
      return;
    }

    const now = Date.now();
    if (now - lastSendTime < RATE_LIMIT_MS) {
      setError("Aguarde alguns segundos antes de enviar outra mensagem.");
      return;
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    const inputTokens = estimateTokens(input);

    if (usageData.usedTokens + inputTokens > maxTokens) {
      setError("Limite de tokens atingido. Tente novamente amanhã.");
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'rdchat_limit_reached', {
          is_logged_in: isLoggedIn
        });
      }
      return;
    }

    setMessages(prev => [...prev, userMessage]);
    
    setInput("");
    setIsLoading(true);
    setError(null);
    setLastSendTime(now);

    abortControllerRef.current = new AbortController();
    const timeoutId = setTimeout(() => {
      abortControllerRef.current?.abort();
      setError("Serviço temporariamente indisponível. Tente novamente.");
      setIsLoading(false);
    }, 30000);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reddata-chat`;
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (resp.status === 429 || resp.status === 402) {
        const errData = await resp.json();
        setError(errData.error || "Limite de uso excedido. Tente mais tarde.");
        setIsLoading(false);
        return;
      }

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to start stream");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      const outputTokens = estimateTokens(assistantContent);
      updateUsageData(inputTokens + outputTokens);
      setIsLoading(false);

    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setError("Timeout: A resposta demorou muito. Tente novamente.");
      } else {
        setError("Erro ao processar mensagem. Tente novamente.");
      }
      setIsLoading(false);
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'rdchat_error', {
          error_type: err.name || 'unknown'
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          setError("Envio de imagens não é permitido na versão Basic do RedData. Entre em contato com a RedMaxx para mais recursos.");
          return;
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      setError("Envio de arquivos não é permitido na versão Basic do RedData. Entre em contato com a RedMaxx para mais recursos.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'rdchat_opened');
    }
  };

  return (
    <>
      {/* Widget Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {!isOpen && (
          <Button
            onClick={toggleChat}
            size="lg"
            aria-label="Fale com o RedData (Beta)"
            className="relative rounded-full w-14 h-14 bg-transparent hover:bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 p-0 overflow-visible group border-0"
            style={{
              animation: 'pulse 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          >
            <img 
              src={reddataChatIcon} 
              alt="RedData Chat" 
              className="w-14 h-14 object-contain"
              style={{
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
              }}
            />
          </Button>
        )}
        
        {/* Chat Panel */}
        {isOpen && (
          <Card className="fixed inset-0 md:relative md:w-[380px] md:h-[600px] w-full h-full md:shadow-2xl md:border-2 border-0 animate-in slide-in-from-bottom-2 md:slide-in-from-bottom-2 flex flex-col md:rounded-lg rounded-none z-[10001]">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={reddataChatIcon} alt="RedData" className="w-8 h-8 object-contain" />
                  <div>
                    <CardTitle className="text-lg">RedData Chat</CardTitle>
                    <CardDescription className="text-white/80 text-xs">
                      {!isLoggedIn && trialData ? `Trial: ${formatTime(trialTimeLeft)}` : 'Versão Basic'}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = '/chat'}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    aria-label="Expandir chat"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleChat}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    aria-label="Fechar chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {!isLoggedIn && trialData && (
                <div className="mt-2">
                  <div className="w-full bg-white/20 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        trialTimeLeft < 60000 ? 'bg-red-400' : 'bg-white'
                      }`}
                      style={{ width: `${Math.min((trialTimeLeft / TRIAL_DURATION_MS) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden min-h-0">
              {isLimitReached && (
                <Alert className="m-2 md:m-4 mb-2 border-orange-500 bg-orange-50 dark:bg-orange-950 flex-shrink-0">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-xs md:text-sm text-orange-800 dark:text-orange-200">
                    Limite gratuito diário atingido. Para continuar, entre em contato com a RedMaxx.
                  </AlertDescription>
                </Alert>
              )}

              {!isLoggedIn && trialTimeLeft === 0 && (
                <Alert className="m-2 md:m-4 mb-2 border-red-500 bg-red-50 dark:bg-red-950 flex-shrink-0">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-xs md:text-sm text-red-800 dark:text-red-200">
                    ⏱️ <strong>Período de teste encerrado!</strong><br />
                    <a href="/auth" className="underline font-medium">Faça login ou cadastre-se</a> para continuar usando gratuitamente com mais tokens disponíveis.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="m-2 md:m-4 mb-2 border-red-500 bg-red-50 dark:bg-red-950 flex-shrink-0">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-xs md:text-sm text-red-800 dark:text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <ScrollArea className="flex-1 p-2 md:p-4 min-h-0" ref={scrollRef}>
                {showTrialWarning && !isLoggedIn && messages.length === 0 && (
                  <Alert className="mb-4 border-blue-500 bg-blue-50">
                    <AlertDescription className="text-sm">
                      🎉 <strong>Teste grátis de 5 minutos!</strong><br />
                      Você pode experimentar o RedData AI por 5 minutos. Após isso, faça login para continuar usando gratuitamente com {ACCOUNT_MAX_TOKENS_PER_DAY.toLocaleString()} tokens/dia.
                      <Button
                        variant="link"
                        size="sm"
                        onClick={markTrialWarningSeen}
                        className="ml-2 h-auto p-0 text-blue-700"
                      >
                        Entendi
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                
                {messages.length === 0 && !showTrialWarning && (
                  <div className="text-center text-muted-foreground py-12 text-sm">
                    <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    Olá! Sou o assistente RedData. Como posso ajudar?
                  </div>
                )}
                
                {messages.length > 0 && (
                  <div className="space-y-4">
                    {messages.map((msg, idx) => (
                      <div key={idx}>
                        <div
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-lg p-3 text-sm ${
                              msg.role === "user"
                                ? "bg-primary text-white"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                          </div>
                        </div>
                        {/* Mostrar botão de login após primeira mensagem de boas-vindas */}
                        {idx === 0 && !isLoggedIn && msg.role === "assistant" && msg.content.includes("período de teste gratuito") && (
                          <div className="flex justify-start mt-2 ml-1">
                            <Button 
                              size="sm" 
                              onClick={() => window.location.href = '/auth'}
                              className="text-xs"
                            >
                              Criar Conta Grátis
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 text-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              <div className="border-t p-2 md:p-4 space-y-2 flex-shrink-0 bg-background">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    placeholder={!isLoggedIn && trialTimeLeft === 0 ? "Faça login para continuar..." : "Digite sua pergunta…"}
                    className="min-h-[50px] md:min-h-[60px] max-h-[100px] md:max-h-[120px] resize-none text-sm"
                    disabled={isLoading || isLimitReached || (!isLoggedIn && trialTimeLeft === 0)}
                    aria-label="Digite sua mensagem"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={!input.trim() || isLoading || isLimitReached || (!isLoggedIn && trialTimeLeft === 0)}
                    size="icon"
                    className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] flex-shrink-0"
                    aria-label="Enviar mensagem"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground text-center leading-tight">
                  As conversas podem ser registradas para melhoria do serviço. Não compartilhe dados sensíveis.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};