import React, { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import reddataLogo from "@/assets/reddata-logo.png";
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
- 🔓 **10.000 tokens/dia** (50x mais!)
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

  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage(200, false)]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAuthOptions, setShowAuthOptions] = useState(true);
  const [tokensRemaining, setTokensRemaining] = useState(200);
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
      const tokens = isLoggedIn ? 10000 : 200;
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
    const tokens = isLoggedIn ? 10000 : 200;
    setTokensRemaining(tokens);
    setMessages([getWelcomeMessage(tokens, isLoggedIn)]);
    setShowAuthOptions(!isLoggedIn);
    setIsSidebarOpen(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F9] flex">
      {isLoggedIn && (
        <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white h-screen sticky top-0">
          <ConversationSidebar
            currentConversationId={conversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </aside>
      )}

      <div className="flex-1 flex flex-col pt-16 sm:pt-20">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 space-y-2 sm:space-y-2.5 flex-1 flex flex-col">
          
          <header className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
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
                className="h-7 sm:h-8 lg:h-10 w-auto object-contain flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
                  Assistente RedData – IA Soberana
                </h1>
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 truncate">
                  IA 100% proprietária, executada dentro da sua infraestrutura.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Token Counter */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-xs lg:text-sm font-medium text-gray-700">
                  {isLoggedIn 
                    ? `${tokensRemaining.toLocaleString()} tokens`
                    : `${tokensRemaining} tokens (trial)`
                  }
                </span>
              </div>

              {/* Login Button */}
              {!isLoggedIn && (
                <Button
                  onClick={() => navigate('/auth')}
                  size="sm"
                  className="bg-[#D8232A] hover:bg-[#B01E24] text-white text-xs lg:text-sm px-3 py-1.5"
                >
                  Login
                </Button>
              )}

              {/* Online Status */}
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-[9px] sm:text-[10px] lg:text-xs text-green-700 border border-green-100 flex-shrink-0">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="hidden sm:inline">Online</span>
              </span>
            </div>
          </header>

          <section className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm px-3 sm:px-4 py-3 sm:py-4 lg:px-5 lg:py-5">
            <h2 className="text-sm sm:text-sm lg:text-base font-semibold text-gray-900">
              Converse com o RedData
            </h2>
            <p className="text-[11px] sm:text-xs lg:text-sm text-gray-600 mt-1 leading-relaxed">
              Faça perguntas em linguagem natural sobre dados, indicadores e cenários 
              de gestão. O RedData responde usando seu LLM interno, com total 
              privacidade e soberania.
            </p>
            <span className="inline-flex items-center w-fit mt-2 sm:mt-3 px-2.5 sm:px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[9px] sm:text-[10px] lg:text-xs text-gray-600">
              🔒 Processamento local, sem modelos externos
            </span>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm flex flex-col h-[calc(100vh-280px)] sm:h-[65vh] min-h-[360px]">
            
            <div className="flex-1 overflow-y-auto px-3 sm:px-3 lg:px-5 pt-3 sm:pt-4 pb-2 space-y-2.5 sm:space-y-3">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 sm:gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#D8232A] flex items-center justify-center text-white text-[9px] sm:text-[10px] font-semibold">
                        RD
                      </div>
                    )}
                    
                    <div
                      className={`
                        max-w-[78%] sm:max-w-[70%] px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl
                        text-[11px] sm:text-xs lg:text-sm leading-relaxed
                        ${
                          isUser
                            ? "bg-gradient-to-br from-red-50 to-red-100/70 text-gray-900 border border-[#D8232A]/20 rounded-br-sm"
                            : "bg-gray-50 text-gray-800 border border-gray-200 rounded-bl-sm"
                        }
                      `}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>

                    {isUser && <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7" />}
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
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#D8232A] flex items-center justify-center text-white text-[9px] sm:text-[10px] font-semibold">
                    RD
                  </div>
                  <div className="flex gap-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {messages.length === 1 && !isLoading && (
              <div className="px-3 sm:px-4 py-2 border-t border-gray-200 flex flex-wrap gap-1.5 sm:gap-2">
                {["Como configurar dashboards?", "Análise de dados em tempo real", "Segurança de dados"].map((sugestao, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sugestao)}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[10px] sm:text-xs text-gray-700 transition-colors"
                  >
                    {sugestao}
                  </button>
                ))}
              </div>
            )}

            <footer className="border-t border-gray-200 p-2 sm:p-3 bg-gray-50/50">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-xs lg:text-sm bg-white border border-gray-300 rounded-lg sm:rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#D8232A] focus:border-transparent placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#D8232A] hover:bg-[#B01D23] text-white rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#D8232A]"
                >
                  Enviar
                </button>
              </div>
            </footer>
          </section>

          <footer className="text-center py-2 sm:py-3">
            <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500">
              🔐 <span className="font-medium">RedData Sovereign AI</span> · Processamento local, sem envio de dados para serviços externos.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
