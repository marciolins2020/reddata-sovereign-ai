import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Maximize2, Minimize2, Trash2, Download, Plus, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import chatIcon from "@/assets/reddata-chat-icon.png";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UsageData {
  tokens: number;
  lastUpdate: string;
}

// Token limits - Plano FREE
const ACCOUNT_MAX_TOKENS_PER_DAY = 10000;
const DEVICE_MAX_TOKENS_PER_DAY = 2000;
const RATE_LIMIT_MS = 3000;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [usageData, setUsageData] = useState<UsageData>({ tokens: 0, lastUpdate: new Date().toISOString() });
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadUsageData();
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getStorageKey = () => user ? `reddata_usage_${user.id}` : 'reddata_usage_device';
  const getMaxTokens = () => user ? ACCOUNT_MAX_TOKENS_PER_DAY : DEVICE_MAX_TOKENS_PER_DAY;

  const loadUsageData = () => {
    const key = getStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      const data = JSON.parse(stored);
      const lastUpdate = new Date(data.lastUpdate);
      const now = new Date();
      if (now.toDateString() === lastUpdate.toDateString()) {
        setUsageData(data);
      } else {
        const newData = { tokens: 0, lastUpdate: now.toISOString() };
        localStorage.setItem(key, JSON.stringify(newData));
        setUsageData(newData);
      }
    }
  };

  const updateUsageData = (newTokens: number) => {
    const key = getStorageKey();
    const newData = {
      tokens: usageData.tokens + newTokens,
      lastUpdate: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(newData));
    setUsageData(newData);
  };

  const estimateTokens = (text: string) => Math.ceil(text.length / 4);

  const loadConversations = async () => {
    if (!user) return;
    
    const { data, error } = await (supabase as any)
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }
    
    setConversations(data || []);
  };

  const loadConversation = async (conversationId: string) => {
    const { data, error } = await (supabase as any)
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error loading messages:', error);
      toast({ title: "Erro", description: "Falha ao carregar conversa", variant: "destructive" });
      return;
    }
    
    setMessages((data || []).map((m: any) => ({ role: m.role as "user" | "assistant", content: m.content })));
    setCurrentConversationId(conversationId);
  };

  const createNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
  };

  const deleteConversation = async (conversationId: string) => {
    const { error } = await (supabase as any)
      .from('conversations')
      .delete()
      .eq('id', conversationId);
    
    if (error) {
      toast({ title: "Erro", description: "Falha ao deletar conversa", variant: "destructive" });
      return;
    }
    
    if (currentConversationId === conversationId) {
      createNewConversation();
    }
    
    loadConversations();
    toast({ title: "Conversa deletada", description: "Histórico removido com sucesso." });
  };

  const saveConversation = async (newMessages: Message[]) => {
    if (!user || newMessages.length === 0) return;

    try {
      let conversationId = currentConversationId;
      
      if (!conversationId) {
        // Criar nova conversa com título baseado na primeira mensagem
        const title = newMessages[0].content.slice(0, 50) + (newMessages[0].content.length > 50 ? '...' : '');
        
        const { data: conversation, error: convError } = await (supabase as any)
          .from('conversations')
          .insert({ user_id: user.id, title })
          .select()
          .single();
        
        if (convError) throw convError;
        
        conversationId = conversation.id;
        setCurrentConversationId(conversationId);
      } else {
        // Atualizar updated_at
        await (supabase as any)
          .from('conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', conversationId);
      }

      // Salvar apenas as novas mensagens
      const lastMessage = newMessages[newMessages.length - 1];
      await (supabase as any)
        .from('messages')
        .insert({
          conversation_id: conversationId,
          role: lastMessage.role,
          content: lastMessage.content
        });

      loadConversations();
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const clearConversation = () => {
    createNewConversation();
    toast({ title: "Conversa limpa", description: "Iniciada nova conversa." });
  };

  const exportConversation = () => {
    const content = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reddata-chat-${new Date().toISOString()}.txt`;
    a.click();
    toast({ title: "Exportado", description: "Conversa salva com sucesso." });
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const now = Date.now();
    if (now - lastRequestTime < RATE_LIMIT_MS) {
      toast({
        title: "Aguarde",
        description: "Por favor, aguarde alguns segundos entre mensagens.",
        variant: "destructive",
      });
      return;
    }

    const estimatedTokens = estimateTokens(input);
    const maxTokens = getMaxTokens();
    
    if (usageData.tokens + estimatedTokens > maxTokens) {
      toast({
        title: "Limite diário atingido",
        description: `Você atingiu o limite de ${maxTokens} tokens por dia. ${user ? 'O limite será renovado amanhã.' : 'Faça login para ter mais tokens disponíveis.'}`,
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setLastRequestTime(now);

    // Salvar mensagem do usuário
    if (user) {
      await saveConversation(newMessages);
    }

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reddata-chat`;
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to start stream");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

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
                  newMessages[newMessages.length - 1].content = assistantMessage;
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }
      }

      updateUsageData(estimatedTokens + estimateTokens(assistantMessage));

      // Salvar resposta do assistente
      if (user) {
        setMessages(prev => {
          saveConversation(prev);
          return prev;
        });
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao processar mensagem",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const remainingTokens = getMaxTokens() - usageData.tokens;
  const usagePercentage = (usageData.tokens / getMaxTokens()) * 100;

  return (
    <div className={`flex h-screen bg-background ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Sidebar */}
      {user && showSidebar && (
        <div className="w-64 border-r bg-card flex flex-col">
          <div className="p-4 border-b">
            <Button onClick={createNewConversation} className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nova Conversa
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {conversations.map((conv) => (
                <div key={conv.id} className="group relative">
                  <Button
                    variant={currentConversationId === conv.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-left pr-8"
                    size="sm"
                    onClick={() => loadConversation(conv.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{conv.title}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 h-7 w-7 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={chatIcon} alt="RedData" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-semibold text-foreground">RedData AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              {remainingTokens} tokens restantes ({Math.round(usagePercentage)}% usado)
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {user && (
            <Button variant="outline" size="sm" onClick={() => setShowSidebar(!showSidebar)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              {showSidebar ? 'Ocultar' : 'Histórico'}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={exportConversation} disabled={messages.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" onClick={clearConversation} disabled={messages.length === 0}>
            <Plus className="h-4 w-4 mr-2" />
            Nova
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          {!isFullscreen && (
            <Link to="/">
              <Button variant="outline" size="sm">Voltar</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-20">
            <img src={chatIcon} alt="RedData" className="w-20 h-20 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Bem-vindo ao RedData AI</p>
            <p className="text-sm">Faça perguntas sobre análise de dados, dashboards ou a plataforma RedData</p>
          </div>
        )}
        
        {messages.map((message, idx) => (
          <div key={idx} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
              message.role === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-foreground"
            }`}>
              <p className="text-sm font-medium mb-1">{message.role === "user" ? "Você" : "RedData AI"}</p>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-3">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-card px-6 py-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
        {!user && (
          <p className="text-xs text-muted-foreground mt-2">
            💡 Faça login para ter acesso a mais tokens diários e salvar suas conversas
          </p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Chat;
