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
    <div className="flex h-screen bg-[var(--rd-bg)]">
      {isLoggedIn && (
        <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white h-screen sticky top-0">
          <ConversationSidebar
            currentConversationId={conversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </aside>
      )}

      <div className="chat-wrapper flex-1">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {isLoggedIn && (
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
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
              className="h-8 w-auto object-contain flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-semibold text-gray-900 truncate">
                Assistente RedData
              </h1>
              <p className="text-xs text-gray-500 truncate">
                IA 100% proprietária
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-xs font-medium text-gray-700">
                {isLoggedIn 
                  ? `${tokensRemaining.toLocaleString()} tokens`
                  : `${tokensRemaining} tokens`
                }
              </span>
            </div>

            {!isLoggedIn && (
              <Button
                onClick={() => navigate('/auth')}
                size="sm"
                className="bg-[#D8232A] hover:bg-[#B01E24] text-white text-xs px-3 py-1.5"
              >
                Login
              </Button>
            )}

            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-xs text-green-700 border border-green-100 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden sm:inline">Online</span>
            </span>
          </div>
        </header>

        {/* MESSAGES */}
        <div className="chat-messages" ref={endRef}>
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center border border-gray-200">
                    <img src={reddataIcon} alt="RedData" className="w-5 h-5 object-contain" />
                  </div>
                )}
                
                <div className={`chat-bubble ${isUser ? "chat-user" : "chat-ai"}`}>
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                </div>

                {isUser && <div className="flex-shrink-0 w-7 h-7" />}
              </div>
            );
          })}

          {showAuthOptions && messages.length === 1 && !isLoading && (
            <div className="flex gap-2 justify-start pl-9">
              <Button
                onClick={() => window.location.href = "/auth?mode=login"}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Sim, fazer login
              </Button>
              <Button
                onClick={() => window.location.href = "/auth?mode=signup"}
                variant="default"
                size="sm"
                className="bg-[#D8232A] hover:bg-[#B01D23] text-xs"
              >
                Não, criar conta
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center border border-gray-200">
                <img src={reddataIcon} alt="RedData" className="w-5 h-5 object-contain" />
              </div>
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          {messages.length === 1 && !isLoading && (
            <div className="flex flex-wrap gap-2 pl-9">
              {["Como configurar dashboards?", "Análise de dados em tempo real", "Segurança de dados"].map((sugestao, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sugestao)}
                  className="px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs text-gray-700 transition-colors"
                >
                  {sugestao}
                </button>
              ))}
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
