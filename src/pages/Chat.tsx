import React, { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import reddataLogo from "@/assets/reddata-logo.png";
import reddataIcon from "@/assets/reddata-icon.png";
import { ConversationSidebar } from "@/components/chat/ConversationSidebar";
import { useChatConversation } from "@/hooks/useChatConversation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

const getWelcomeMessage = (tokensRemaining: number, isLoggedIn: boolean): Message => ({
  id: "welcome",
  role: "assistant",
  createdAt: new Date().toISOString(),
  content: `👋 **Bem-vindo ao RedData AI!**

Você tem **${tokensRemaining} tokens gratuitos** para testar nossas capacidades de IA.

**Ao criar uma conta gratuita:**
- 🔓 **10.000 tokens/dia** (10x mais!)
- 💾 **Histórico de conversas** salvo
- ⏰ **Sem limites**
- 🔄 **Renovação diária** automática

**Você já tem uma conta?`
});

export default function RedDataChatPage() {
  const navigate = useNavigate();
  const {
    conversationId,
    messages: savedMessages,
    setMessages: setSavedMessages,
    isLoggedIn,
    userId,
    createNewConversation,
    saveMessage,
    loadConversation,
    startNewConversation
  } = useChatConversation();

  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage(1000, false)]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAuthOptions, setShowAuthOptions] = useState(true);
  const [tokensRemaining, setTokensRemaining] = useState(1000);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length, isLoading]);

  useEffect(() => {
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
      setShowAuthOptions(false);
    } else {
      const tokens = isLoggedIn ? 10000 : 1000;
      setTokensRemaining(tokens);
      setMessages([getWelcomeMessage(tokens, isLoggedIn)]);
      setShowAuthOptions(!isLoggedIn);
    }
  }, [savedMessages, isLoggedIn]);

  const handleSend = async (fromSuggestion?: string) => {
    const text = (fromSuggestion ?? input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setShowAuthOptions(false);

    let currentConvId = conversationId;
    const wasNewConversation = !conversationId;
    
    if (isLoggedIn && userId && !conversationId) {
      currentConvId = await createNewConversation(text);
      if (!currentConvId) {
        setIsLoading(false);
        return;
      }
    }

    if (isLoggedIn && currentConvId) {
      await saveMessage(currentConvId, "user", text);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reddata-chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok) {
        throw new Error("Erro da API");
      }

      const data = await response.json();
      const answerText: string = data.answer ?? "Resposta recebida do RedData.";

      const assistantMessage: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: answerText,
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (isLoggedIn && currentConvId) {
        await saveMessage(currentConvId, "assistant", answerText);
        
        // Se foi uma nova conversa, recarregar a lista
        if (wasNewConversation) {
          // O realtime vai atualizar automaticamente
        }
      }
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Não consegui processar sua solicitação agora. Tente novamente em alguns instantes.",
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectConversation = async (convId: string) => {
    await loadConversation(convId);
    setIsSidebarOpen(false);
  };

  const handleNewConversation = () => {
    startNewConversation();
    const tokens = isLoggedIn ? 10000 : 1000;
    setTokensRemaining(tokens);
    setMessages([getWelcomeMessage(tokens, isLoggedIn)]);
    setShowAuthOptions(!isLoggedIn);
    setIsSidebarOpen(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-wrapper">
      
      {/* Desktop Sidebar */}
      {isLoggedIn && (
        <div className="hidden md:block chat-sidebar-desktop">
          <ConversationSidebar
            currentConversationId={conversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>
      )}

      {/* Main Chat Area */}
      <div className="chat-main-area flex-1 flex flex-col">
        
        {/* Header Desktop */}
        <div className="hidden md:flex chat-header-desktop">
          <div className="chat-header-left">
            <img src={reddataIcon} alt="RedData" className="h-8 w-8" />
            <div>
              <div className="font-semibold text-foreground">Assistente RedData</div>
              <div className="text-xs text-muted-foreground">IA 100% proprietária</div>
            </div>
          </div>
          <div className="chat-header-right">
            <span className="text-muted-foreground">{tokensRemaining.toLocaleString()} tokens</span>
            <span className="flex items-center gap-1.5 text-success">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Online
            </span>
            {!isLoggedIn && (
              <Button
                onClick={() => navigate('/auth')}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between p-4 border-b bg-background">
          {isLoggedIn && (
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <ConversationSidebar
                  currentConversationId={conversationId}
                  onSelectConversation={handleSelectConversation}
                  onNewConversation={handleNewConversation}
                />
              </SheetContent>
            </Sheet>
          )}
          <img 
            src={reddataLogo} 
            alt="RedData" 
            className="h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{tokensRemaining.toLocaleString()}</span>
            {!isLoggedIn && (
              <Button
                onClick={() => navigate('/auth')}
                size="sm"
                className="bg-primary text-primary-foreground text-xs"
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* MESSAGES */}
        <div className="chat-messages" ref={endRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${
                msg.role === "user" ? "chat-user" : "chat-ai"
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
            </div>
          ))}

          {isLoading && (
            <div className="chat-ai">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          {messages.length === 1 && !isLoading && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Como configurar dashboards?", "Análise de dados em tempo real", "Segurança de dados"].map((sugestao, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sugestao)}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  {sugestao}
                </button>
              ))}
            </div>
          )}

          {showAuthOptions && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => navigate("/auth")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Criar conta grátis
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                Já tenho conta
              </button>
            </div>
          )}
        </div>

        {/* INPUT FIXO */}
        <div className="chat-input-bar">
          <input
            className="chat-input"
            placeholder="Pergunte ao RedData…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button 
            className="chat-send-btn" 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
